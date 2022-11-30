from flask import request
from flask_login import current_user
from app import app, db
from app.models import User, Trade


@app.route('/api/trade/id/<int:id>')
def get_trade_by_id(id: int) -> dict:
    if not user_is_authorized():
        return 'Not authorized.', 401
    
    trade = Trade.query.get(id)
    if trade is not None:
        return trade.json()
    else:
        return f'Trade id {id} not found.', 404

@app.route('/api/trade/user')
def get_trades_by_user() -> list[dict]:
    if not user_is_authorized():
        return 'Not authorized.', 401
    
    trades = current_user.trades
    return [t.json() for t in trades]

@app.route('/api/trade', methods=['POST'])
def trade() -> list[dict]:
    if current_user is None:
        return 'Not authorized.', 401

    trade_obj = request.json

    new_trade = create_trade(trade_obj, current_user)
    cash_trade = create_cash_transaction(new_trade, current_user)

    db.session.add(new_trade)
    db.session.add(cash_trade)
    db.session.commit()

    return [new_trade.json(), cash_trade.json()], 201

def create_trade(trade_obj: dict, user: User) -> Trade:
    new_trade = Trade(
        user = user,
        symbol = trade_obj['symbol'],
        shares = trade_obj['shares'],
        price = trade_obj['price']
    )
    return new_trade

def create_cash_transaction(trade: Trade, user: User) -> Trade:
    cash_trade = Trade(
        user = user,
        symbol = '$CASH',
        shares = -(trade.shares * trade.price),
        price = 1
    )
    return cash_trade

@app.route('/api/trade/id/<int:id>', methods=['DELETE'])
def delete_trade(id: int) -> str:
    if not user_is_authorized():
        return 'Not authorized.', 401

    trade = Trade.query.get(id)
    if trade is not None:
        db.session.delete(trade)
        db.session.commit()
        return '', 200
    else:
        return f'Trade id {id} not found.', 404

def user_is_authorized():
    if current_user is None:
        return False
    return True
