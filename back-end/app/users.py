from flask import request, session
from flask_login import login_user, logout_user, current_user
from app import app, db, STARTING_CASH, login_manager
from app.models import User, Trade
from sqlalchemy.sql import func


@login_manager.user_loader
def load_user(user_id: str) -> User:
    return User.query.get(int(user_id))

@app.route('/api/user', methods=['POST'])
def create_user():
    username = request.json['username']
    password = request.json['password']

    user_exists = get_user_by_username(username) is not None
    if user_exists:
        return f'Username {username} already exists.', 409

    try:
        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
    except Exception as err:
        return f'Server error: {err=}.', 500
    else:
        login_user(new_user, remember=True)
        cash = Trade(user=new_user, symbol='$CASH', shares=STARTING_CASH, price=1)
        db.session.add(cash)
        db.session.commit()
        return new_user.json(), 201

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

@app.route('/api/user', methods=['GET'])
def return_user():
    username = request.json['username']
    user = get_user_by_username(username)
    if user is None:
        return f'User not found.', 404
    else:
        return user.username

@app.route('/api/user', methods=['DELETE'])
def delete_user():
    username = request.json['username']
    password = request.json['password']

    user = get_user_by_username(username)
    if user is None:
        return f'User {username} not found.', 404
    
    if user.check_password(password):
        db.session.delete(user)
        db.session.commit()
        return user.username
    else:
        return 'Incorrect password.', 401

@app.route('/api/user/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = get_user_by_username(username)

    if user is None:
        return 'Invalid username.', 401
    
    if user.check_password(password):
        user.last_login = func.now()
        db.session.commit()
        login_user(user, remember=True)
        return current_user.username
    else:
        return 'Incorrect password.', 401

@app.route('/api/user/logout', methods=['POST'])
def logout():
    username = current_user.username
    current_user.last_logout = func.now()
    db.session.commit()
    logout_user()
    return username
