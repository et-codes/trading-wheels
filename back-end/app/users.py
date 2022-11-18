import tokens
from flask import request
from app import app, db, STARTING_CASH
from app.models import User, Trade
from sqlalchemy.sql import func
from sqlalchemy.exc import IntegrityError


@app.route('/user', methods=['POST'])
def create_user():
    (username, password) = request.json.values()

    try:
        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        return f'Username {username} already exists.', 400
    except Exception as err:
        return f'Server error: {err=}.', 500
    else:
        cash = Trade(user=new_user, symbol='$CASH', shares=STARTING_CASH, price=1)
        db.session.add(cash)
        db.session.commit()
        return new_user.json(), 201

def get_user(username):
    return User.query.filter_by(username=username).first()

@app.route('/user/<string:username>')
def check_user(username):
    user = get_user(username)
    if user is None:
        return f'User {username} not found.', 404
    else:
        return user.username

@app.route('/user', methods=['DELETE'])
def delete_user():
    (username, password) = request.json.values()

    user = get_user(username)
    if user is None:
        return f'User {username} not found.', 404
    
    if user.check_password(password):
        db.session.delete(user)
        db.session.commit()
        return user.username
    else:
        return 'Incorrect password.', 401

@app.route('/user/login', methods=['POST'])
def login():
    (username, password) = request.json.values()
    user = get_user(username)

    if user is None:
        return 'Invalid username.', 401
    
    if user.check_password(password):
        user.last_login = func.now()
        db.session.commit()
        token = tokens.create(username)
        return token
    else:
        return 'Incorrect password.', 401

@app.route('/user/logout/<string:username>')
def logout(username):
    if not tokens.is_valid(request):
        return 'Invalid or expired token.', 401

    user = get_user(username)
    user.last_logout = func.now()
    db.session.commit()
    return username
