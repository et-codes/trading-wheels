import pyEX
import tokens
from app import app
from flask import request


c = pyEX.Client(version='stable')

@app.route('/stock/<string:symbol>')
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
