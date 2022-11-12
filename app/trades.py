import tokens
from flask import request, Request, Response
from app import app, db
from app.models import User, Trade


@app.route('/trade/id/<int:id>')
def get_trade_by_id(id: int) -> dict:
    trade = Trade.query.get(id)
    if trade is not None:
        return trade.json()
    else:
        return f'Trade id {id} not found.', 404

@app.route('/trade/user/<string:username>')
def get_trades_by_username(username: str) -> list[dict]:
    user = get_user(username)
    trades = Trade.query.filter_by(user=user).all()
    return [t.json() for t in trades]

def get_user(username):
    user = User.query.filter_by(username=username).first()
    return user

@app.route('/trade', methods=['POST'])
def trade() -> list[dict]:
    if not token_is_valid(request):
        return 'Invalid or expired token.', 401

    new_trade = create_trade(request)
    cash_trade = create_cash_transaction(new_trade)

    db.session.add(new_trade)
    db.session.add(cash_trade)
    db.session.commit()

    return [new_trade.json(), cash_trade.json()], 201

def token_is_valid(request: Request) -> bool:
    token = get_token(request)
    return tokens.is_valid(token) and not tokens.is_expired(token)

def get_token(request: Request) -> str:
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    return token

def create_trade(request: Request) -> Trade:
    trade_obj = request.json
    user = get_user(trade_obj['username'])
    new_trade = Trade(
        user = user,
        symbol = trade_obj['symbol'],
        shares = trade_obj['shares'],
        price = trade_obj['price']
    )
    return new_trade

def create_cash_transaction(trade: Trade) -> Trade:
    cash_trade = Trade(
        user_id = trade.user_id,
        symbol = '$CASH',
        shares = -(trade.shares * trade.price),
        price = 1
    )
    return cash_trade

@app.route('/trade/id/<int:id>', methods=['DELETE'])
def delete_trade(id: int) -> Response:
    trade = Trade.query.get(id)
    if trade is not None:
        db.session.delete(trade)
        db.session.commit()
        return Response(status=200)
    else:
        return f'Trade id {id} not found.', 404
