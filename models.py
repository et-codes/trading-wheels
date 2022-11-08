from database import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    last_login = db.Column(db.TIMESTAMP(timezone=True))
    last_logout = db.Column(db.TIMESTAMP(timezone=True))

    def __repr__(self):
        return f"User(id='{self.id}', username='{self.username}')"

    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "last_login": self.last_login,
            "last_logout": self.last_logout
        }