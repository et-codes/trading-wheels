from database import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f"User(id='{self.id}', username='{self.username}')"

    def json(self):
        return {
            "id": self.id,
            "username": self.username
        }