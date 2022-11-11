import tokens
from flask import request
from database import db
from models import User, Trade


def get_trade_by_id(id: int) -> dict:
    trade = db.session.query(Trade).get(id)
    if trade is not None:
        return trade.json()
    else:
        return f'Trade id {id} not found.', 404

def get_trades_by_user(username: str) -> list[dict]:
    user_id = get_user_id(username) 
    query = db.select(Trade).filter_by(user_id=user_id)
    trades = db.session.execute(query).scalars().all()

    return [t.json() for t in trades]

def get_user_id(username: str) -> int:
    query = db.select(User).filter_by(username=username)
    user = db.session.execute(query).scalar_one()
    return user.id

def trade(trade_obj: dict) -> dict:
    # validate token
    # create Trades from trade_obj (trade & $CASH)
    # write trades to db
    # return 201 / location header
    pass

