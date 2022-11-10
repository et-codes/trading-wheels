from database import db
from sqlalchemy.sql import func


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_on = db.Column(db.TIMESTAMP(timezone=True),
        server_default=func.now())
    last_login = db.Column(db.TIMESTAMP(timezone=True))
    last_logout = db.Column(db.TIMESTAMP(timezone=True))
    trades = db.relationship('Trade', backref='user', cascade='delete')

    def __repr__(self):
        return f"User(username='{self.username}', password=<...>)"

    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "last_login": self.last_login,
            "last_logout": self.last_logout
        }


class Trade(db.Model):
    __tablename__ = 'trades'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
        nullable=False)
    symbol = db.Column(db.String(5), nullable=False)
    shares = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
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
