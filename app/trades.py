import tokens
from flask import request
from app import app, db
from app.models import User, Trade
from app.users import get_user


@app.route('/trade/id/<int:id>')
def get_trade_by_id(id: int) -> dict:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401
    
    trade = Trade.query.get(id)
    if trade is not None:
        return trade.json()
    else:
        return f'Trade id {id} not found.', 404

@app.route('/trade/user/<string:username>')
def get_trades_by_username(username: str) -> list[dict]:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401

    user = get_user(username)
    if user is None:
        return f'Username {username} not found.', 404
    
    trades = user.trades
    return [t.json() for t in trades]

@app.route('/trade', methods=['POST'])
def trade() -> list[dict]:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401

    trade_obj = request.json
    user = get_user(trade_obj['username'])

    new_trade = create_trade(trade_obj, user)
    cash_trade = create_cash_transaction(new_trade, user)

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

@app.route('/trade/id/<int:id>', methods=['DELETE'])
def delete_trade(id: int) -> str:
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401

    trade = Trade.query.get(id)
    if trade is not None:
        db.session.delete(trade)
        db.session.commit()
        return '', 200
    else:
        return f'Trade id {id} not found.', 404
