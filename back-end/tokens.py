import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from flask import Request


load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')
TOKEN_EXPIRATION_IN_HOURS = 24


def create(username):
    expiration_date = datetime.today() + \
        timedelta(hours=TOKEN_EXPIRATION_IN_HOURS)
    payload_data = {
        "username": username,
        "expiration": expiration_date.isoformat()
    }
    token = jwt.encode(
        payload=payload_data,
        key=SECRET_KEY,
        algorithm='HS256'
    )
    return token


def is_verified(token):
    try:
        jwt.decode(
            token,
            key=SECRET_KEY,
            algorithms='HS256'
        )
        return True
    except:
        return False


def is_expired(token):
    try:
        payload = jwt.decode(
            token,
            key=SECRET_KEY,
            algorithms='HS256'
        )

        exp_date = datetime.fromisoformat(payload['expiration'])

        if exp_date > datetime.today():
            return False
        else:
            return True
    except:
        return True


def get_token(request: Request) -> str:
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    return token


def is_valid(request: Request) -> bool:
    token = get_token(request)
    return is_verified(token) and not is_expired(token)

