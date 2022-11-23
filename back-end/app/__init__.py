from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_sessionstore import Session


STARTING_CASH = 100000

app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config.from_object(Config)
db = SQLAlchemy(app)
app.config['SESSION_SQLALCHEMY'] = db
server_session = Session(app)
migrate = Migrate(app, db)

from app import home, users, trades, stocks, portfolio
