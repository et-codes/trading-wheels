import os
import requests
import tokens
from dotenv import load_dotenv
from app import app
from flask import request, jsonify


load_dotenv()
IEX_API_TOKEN = os.environ.get('IEX_API_TOKEN')
IEX_API_BASE_URL = 'https://cloud.iexapis.com/stable'

@app.route('/stock/<string:symbol>')
def return_stock_data(symbol):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_stock_data(symbol)

def get_api_url(symbol):
    return f'{IEX_API_BASE_URL}/stock/{symbol}/quote?token={IEX_API_TOKEN}'

def get_stock_data(symbol):
    if symbol == '$CASH':
        return {
            'symbol': '$CASH',
            'companyName': 'Cash',
            'latestPrice': 1.0,
            'primaryExchange': '-'
        }
    response = requests.get(get_api_url(symbol))
    return response.json()
