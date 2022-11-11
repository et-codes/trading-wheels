import bcrypt
import tokens
from flask import request
from database import db
from models import User, Trade
from sqlalchemy.sql import func
from sqlalchemy.orm.exc import NoResultFound


def create_user():
    (username, password) = request.json.values()   
    hashed = create_pw_hash(password)
    new_user = User(username=username, password=hashed)

    try:
        db.session.add(new_user)
        db.session.commit()
        db.session.refresh(new_user)
        starting_balance = Trade(
            user_id=new_user.id, 
            symbol='$CASH', 
            shares=100000, 
            price=1
        )
        db.session.add(starting_balance)
        db.session.commit()
        return new_user.json(), 201
    except Exception as err:
        print(err)
        return f'Error creating user: {err=}', 500

def create_pw_hash(password):
    salt = bcrypt.gensalt()
    password = password.encode('utf-8')
    hashed = bcrypt.hashpw(password, salt).decode('utf-8')
    return hashed

def get_user(username):
    query = db.select(User).filter_by(username=username)
    try:
        user = db.session.execute(query).scalar_one() 
        return user
    except NoResultFound:
        return None

def check_user(username):
    user = get_user(username)
    if user is None:
        return f'User {username} not found.', 404
    else:
        return user.username

def delete_user():
    (username, password) = request.json.values()
    password = password.encode('utf-8')

    # Get user data, return 404 if doesn't exist
    user = get_user(username)
    if user is None:
        return f'User {username} not found.', 404
    
    # Delete if the passwords match
    if bcrypt.checkpw(password, user.password.encode('utf-8')):
        db.session.delete(user)
        db.session.commit()
        return user.username
    else:
        return 'Incorrect password.', 401

def login():
    (username, password) = request.json.values()
    password = password.encode('utf-8')
    user = get_user(username)

    if user is not None:
        saved_password = user.password.encode('utf-8')
    else:
        return 'Invalid username.', 401
    
    if bcrypt.checkpw(password, saved_password):
        user.last_login = func.now()
        db.session.commit()
        token = tokens.create(username)
        return token
    else:
        return 'Incorrect password.', 401

def logout(username):
    user = get_user(username)
    user.last_logout = func.now()
    db.session.commit()
    return username
