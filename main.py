import os
from database import db
from dotenv import load_dotenv
from flask import Flask
from models import User, Trade


load_dotenv()
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db.init_app(app)

# Create tables if they don't already exist
with app.app_context():
    # db.drop_all()
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
