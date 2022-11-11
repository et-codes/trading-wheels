import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv


load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')
TOKEN_EXPIRATION_IN_HOURS = 24


# Create new token
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


# Validate token
def is_valid(token):
    try:
        jwt.decode(
            token,
            key=SECRET_KEY,
            algorithms='HS256'
        )
        return True
    except:
        return False


# Check if token is expired
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


if __name__ == '__main__':
    username = 'eric'
    token = create(username)
    print('Token:', token)
    print('Token data:', validate(token))
    print('Token expired:', is_expired(token))
