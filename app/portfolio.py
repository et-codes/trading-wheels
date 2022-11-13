import tokens
from flask import request, Request, Response, jsonify
from app import app, db
from app.models import User, Trade
from app.users import get_user


# portfolio = [
#   {symbol, description, shares, price, value, gain},
#   ...,
#   {stocks, cash, gain}
# ]

@app.route('/trade/portfolio/<string:username>')
def get_portfolio(username: str) -> list[dict]:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401

    user = get_user(username)
    if user is None:
        return f'Username {username} not found.', 404
    
    all_trades = user.trades
    # symbols = Trade.query.with_entities(Trade.symbol).filter_by(user=user).distinct().all()
    # need a way to get the current stock price

    return [trade.json() for trade in all_trades]

