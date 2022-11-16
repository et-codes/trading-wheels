import pyEX
import tokens
from app import app
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
    pass