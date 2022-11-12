from flask import request, Request, Response
from app import app, db
from app.models import User, Trade


# portfolio = [
#   {symbol, description, shares, price, value, gain},
#   ...,
#   {stocks, cash, gain}
# ]

@app.route('/trade/portfolio/<string:username>')
def get_portfolio(username: str) -> list[dict]:
    pass