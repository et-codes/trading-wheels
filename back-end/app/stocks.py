import pyEX
from app import app, db
from app.models import Stock, MetaData, User
from datetime import datetime, timedelta, timezone
from flask import session
from sqlalchemy.sql import func, or_


c = pyEX.Client(version='stable');

CASH = {
    'symbol': '$CASH',
    'companyName': 'Cash',
    'latestPrice': 1.0,
    'primaryExchange': '-'
}

@app.route('/stock/search/<string:fragment>')
def return_stock_search_result(fragment):
    if not user_is_authorized():
        return 'Not authorized.', 401
    return get_stock_search_result(fragment)

@app.route('/stock/<string:symbol>')
def return_stock_data(symbol):
    if symbol == '$CASH': return CASH
    if not user_is_authorized():
        return 'Not authorized.', 401
    return get_stock_data(symbol)

def get_stock_data(symbol):
    quote = get_stock_quote(symbol)
    company = get_company_data(symbol)
    chart = get_stock_chart(symbol, '3m')
    
    return {
        'quote': quote,
        'company': company,
        'chart': chart
    }

def get_stock_quote(symbol):
    try:
        quote = c.quote(symbol, filter='symbol,companyName,latestPrice,primaryExchange')
        return quote
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

def get_stock_chart(symbol, range):
    allowable_ranges = ['max', '5y', '2y', '1y', 'ytd', '6m', '3m', '1m', '1mm',
		'5d', '5dm', '1d']
    if range not in allowable_ranges:
        return f'Range must be in {allowable_ranges}.', 400
    try:
        chart = c.chart(symbol, timeframe=range, sort="asc")
        return chart
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

def get_company_data(symbol):
    try:
        company_data = c.company(symbol)
        return company_data
    except pyEX.common.exception.PyEXception:
        return f'Symbol "{symbol}" not found.', 404

def get_stock_search_result(fragment):
    check_for_stale_symbol_list()
    stocks = Stock.query.filter(or_(
        Stock.description.ilike(f'%{fragment}%'),
        Stock.symbol.ilike(f'%{fragment}%')
        )).all()
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

def user_is_authorized():
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    if user is None:
        return False
    return True

