import tokens
from flask import request
from app import app
from app.users import get_user
from app.stocks import get_stock_data
from app.models import Trade


# portfolio = [
#   {symbol, description, shares, price, value, gain},
#   ...,
#   {stocks, cash, gain}
# ]

@app.route('/portfolio/<string:username>')
def return_portfolio(username: str) -> list[dict]:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    return get_portfolio(username)

def get_portfolio(username: str) -> list[dict]:
    user = get_user(username)
    if user is None:
        return f'Username {username} not found.', 404
    
    all_trades = user.trades
    symbols = Trade.query.with_entities(Trade.symbol).filter_by(user=user).distinct().all()

    stock_data = {}
    for symbol in symbols:
        stock_data[symbol[0]] = get_stock_data(symbol[0])

    return stock_data