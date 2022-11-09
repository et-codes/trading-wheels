import bcrypt
from flask import request
from database import db
from models import User
from sqlalchemy.orm.exc import NoResultFound


def create_user():
    (username, password) = request.json.values()
    
    salt = bcrypt.gensalt()
    password = password.encode('utf-8')
    hashed = bcrypt.hashpw(password, salt).decode('utf-8')

    new_user = User(username=username, password=hashed)

    try:
        db.session.add(new_user)
        db.session.commit()
        return new_user.json(), 201
    except Exception as err:
        return f'Error creating user: {err=}', 500

def get_user(username):
    query = db.select(User).filter_by(username=username)
    try:
        user = db.session.execute(query).scalar_one()
        return user.username
    except NoResultFound:
        return f'User {username} not found.', 404

def delete_user():
    (username, password) = request.json.values()


def login(username):
    pass

def logout(username):
    pass