from app import db
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    created_on = db.Column(db.TIMESTAMP(timezone=True),
        server_default=func.now())
    last_login = db.Column(db.TIMESTAMP(timezone=True))
    last_logout = db.Column(db.TIMESTAMP(timezone=True))
    trades = db.relationship('Trade', backref='user', cascade='delete')

    def __repr__(self):
        return f"User(username='{self.username}', password=<...>)"
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "last_login": self.last_login,
            "last_logout": self.last_logout
        }


class Trade(db.Model):
    __tablename__ = 'trades'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    symbol = db.Column(db.String(16))
    shares = db.Column(db.Float)
    price = db.Column(db.Float)
    date = db.Column(db.TIMESTAMP(timezone=True),
        server_default=func.now())
    
    def __repr__(self):
        return f"Trade(user_id={self.user_id}, " + \
            f"symbol='{self.symbol}', shares={self.shares}, " + \
            f"price={self.price}, date='{self.date}')"
    
    def json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "symbol": self.symbol,
            "shares": self.shares,
            "price": self.price,
            "date": self.date
        }


class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(16))
    description = db.Column(db.String(256))

    def __repr__(self):
        return f"Stock(symbol='{self.symbol}', description='{self.description}')"
    
    def json(self):
        return {
            "id": self.id,
            "symbol": self.symbol,
            "description": self.description
        }


class MetaData(db.Model):
    __tablename__ = 'meta_data'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(64))
    value = db.Column(db.String(256))
    date = db.Column(db.TIMESTAMP(timezone=True))

    def __repr__(self):
        return f"MetaData(key='{self.key}', value='{self.value}'," + \
            " date='{self.date}')"
    
    def json(self):
        return {
            "id": self.id,
            "key": self.key,
            "value": self.value,
            "date": self.date
        }
