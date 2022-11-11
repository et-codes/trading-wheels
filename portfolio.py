from flask import request, Request, Response
from database import db
from models import User, Trade


# portfolio = [
#   {symbol, description, shares, price, value, gain},
#   ...,
#   {stocks, cash, gain}
# ]


def get_portfolio(username: str) -> list[dict]:
    pass