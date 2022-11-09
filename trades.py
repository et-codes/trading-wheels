import tokens
from flask import request
from database import db
from models import User, Trade


def get_portfolio(username: str) -> list[dict]:
    query = db.select(User).filter_by(username=username)
    user = db.session.execute(query).scalar_one() 

    query = db.select(Trade).filter_by(user_id=user.id)
    trades = db.session.execute(query).scalars().all()

    return [t.json() for t in trades]


def trade(trade_obj: dict) -> dict:
    pass

