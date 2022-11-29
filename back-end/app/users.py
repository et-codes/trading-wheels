from flask import request, session
from app import app, db, STARTING_CASH
from app.models import User, Trade
from sqlalchemy.sql import func


@app.route('/api/user', methods=['POST'])
def create_user():
    username = request.json['username']
    password = request.json['password']

    user_exists = User.query.filter_by(username=username).first() is not None
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
        session.permanent = True
        session['user_id'] = new_user.id
        cash = Trade(user=new_user, symbol='$CASH', shares=STARTING_CASH, price=1)
        db.session.add(cash)
        db.session.commit()
        return new_user.json(), 201

def get_user(username):
    return User.query.filter_by(username=username).first()

@app.route('/api/user', methods=['GET'])
def return_user():
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    if user is None:
        return f'User not found.', 404
    else:
        return user.username

@app.route('/api/user', methods=['DELETE'])
def delete_user():
    username = request.json['username']
    password = request.json['password']

    user = get_user(username)
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
    user = get_user(username)

    if user is None:
        return 'Invalid username.', 401
    
    if user.check_password(password):
        user.last_login = func.now()
        db.session.commit()
        session.permanent = True
        session['user_id'] = user.id
        return user.username
    else:
        return 'Incorrect password.', 401

@app.route('/api/user/logout', methods=['POST'])
def logout():
    username = request.json['username']
    user = get_user(username)
    user.last_logout = func.now()
    db.session.commit()
    session.pop('user_id', None)
    return username
