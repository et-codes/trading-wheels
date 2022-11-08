import os
import sys
import views
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
# Drop all tables if 'rebuild' argument used on command line
with app.app_context():
    if len(sys.argv) > 1 and sys.argv[1].lower() == 'rebuild':
        print('Rebuilding database tables...')
        db.drop_all()
    db.create_all()


# Home page
app.add_url_rule('/', view_func=views.home)

# User-related endpoints
app.add_url_rule('/user/<username>', view_func=views.create_user)
app.add_url_rule('/login/<username>', view_func=views.login)
app.add_url_rule('/logout/<username>', view_func=views.logout)


if __name__ == '__main__':
    app.run(debug=True)
