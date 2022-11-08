from database import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)

    def __repr__(self):
        return f"User(id='{self.id}', username='{self.username}', email='{self.email}')"

    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }