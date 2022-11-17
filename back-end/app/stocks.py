import pyEX
import tokens
from app import app, db
from app.models import Stock
from datetime import datetime, timedelta
from flask import request


c = pyEX.Client(version='stable')

@app.route('/stock/quote/<string:symbol>')
def return_stock_data(symbol):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_stock_data(symbol)

def get_stock_data(symbol):
    if symbol == '$CASH':
        return {
            'symbol': '$CASH',
            'companyName': 'Cash',
            'latestPrice': 1.0,
            'primaryExchange': '-'
        }
    quote = c.quote(symbol, filter='symbol,companyName,latestPrice,primaryExchange')
    return quote

@app.route('/stock/search/<string:fragment>')
def return_stock_search_result(fragment):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_stock_search_result(fragment)

def get_stock_search_result(fragment):
    check_for_stale_symbol_list()
    stocks = Stock.query.filter(Stock.description.like(f'%{fragment}%')).all()
    return [stock.json() for stock in stocks]

def check_for_stale_symbol_list():
    last_update = Stock.query.first()
    if last_update is None or \
        last_update.last_update <= datetime.utcnow() - timedelta(hours=24):
        print('Refreshing stock symbol table...')
        refresh_symbols()

def refresh_symbols():
    delete_stale_symbols()
    symbol_list = c.symbols(filter='symbol,name')
    for symbol in symbol_list:
        stock = Stock(symbol=symbol['symbol'], description=symbol['name'])
        db.session.add(stock)
    db.session.commit()

def delete_stale_symbols():
    Stock.query.delete()
    db.session.commit()
