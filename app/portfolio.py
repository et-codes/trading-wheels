import tokens
from flask import request, Request, Response, jsonify
from app import app, db
from app.models import User, Trade
from app.trades import get_trades_by_username


# portfolio = [
#   {symbol, description, shares, price, value, gain},
#   ...,
#   {stocks, cash, gain}
# ]

@app.route('/trade/portfolio/<string:username>')
def get_portfolio(username: str) -> list[dict]:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401

    user = User.query.filter_by(username=username).first()
    all_trades = user.trades

    return [trade.json() for trade in all_trades]

