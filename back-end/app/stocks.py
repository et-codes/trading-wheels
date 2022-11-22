import pyEX
import tokens
from app import app, db
from app.models import Stock, MetaData
from datetime import datetime, timedelta, timezone
from flask import request
from sqlalchemy.sql import func


c = pyEX.Client(version='stable');

CASH = {
    'symbol': '$CASH',
    'companyName': 'Cash',
    'latestPrice': 1.0,
    'primaryExchange': '-'
}

@app.route('/stock/quote/<string:symbol>')
def return_stock_data(symbol):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_stock_data(symbol)

def get_stock_data(symbol):
    if symbol == '$CASH':
        return CASH
    try:
        quote = c.quote(symbol, filter='symbol,companyName,latestPrice,primaryExchange')
        return quote
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

@app.route('/stock/chart/<string:symbol>', defaults={'range': '3m'})
@app.route('/stock/chart/<string:symbol>/<string:range>')
def return_stock_chart(symbol, range):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_stock_chart(symbol, range)

def get_stock_chart(symbol, range):
    allowable_ranges = ['max', '5y', '2y', '1y', 'ytd', '6m', '3m', '1m', '1mm',
		'5d', '5dm', '1d']
    if range not in allowable_ranges:
        return f'Range must be in {allowable_ranges}.', 400
    try:
        chart = c.chart(symbol, timeframe=range)
        return chart
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

@app.route('/stock/company/<string:symbol>')
def return_company_data(symbol):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_company_data(symbol)

def get_company_data(symbol):
    try:
        company_data = c.company(symbol)
        return company_data
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

@app.route('/stock/search/<string:fragment>')
def return_stock_search_result(fragment):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_stock_search_result(fragment)

def get_stock_search_result(fragment):
    check_for_stale_symbol_list()
    stocks = Stock.query.filter(Stock.description.ilike(f'%{fragment}%')).all()
    return [stock.json() for stock in stocks]

def check_for_stale_symbol_list():
    last_update = MetaData.query.filter(MetaData.key == "last_stock_update").first()
    now = datetime.now(timezone.utc)
    if last_update is None or last_update.updated <= now - timedelta(hours=24):
        print('Refreshing stock symbol table...')
        refresh_symbols()

def refresh_symbols():
    delete_stale_symbols()
    symbol_list = c.symbols(filter='symbol,name')
    for symbol in symbol_list:
        stock = Stock(symbol=symbol['symbol'], description=symbol['name'])
        db.session.add(stock)
    db.session.commit()
    set_last_update()

def set_last_update():
    last_update = MetaData.query.filter(MetaData.key == "last_stock_update").first()
    if last_update is None:
        last_update = MetaData(key="last_stock_update", updated=func.now())
        db.session.add(last_update)
    else:
        last_update.updated = func.now()
    db.session.commit()

def delete_stale_symbols():
    Stock.query.delete()
    db.session.commit()
