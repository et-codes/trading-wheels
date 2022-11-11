import portfolio
import sys
import trades
import users
from config import Config
from database import db
from flask import Flask
from models import User, Trade


app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config.from_object(Config)
db.init_app(app)


# Set up database
with app.app_context():
    if len(sys.argv) > 1 and sys.argv[1].lower() == 'rebuild':
        # Recreate tables if 'rebuild' argument used on command line
        print('Rebuilding database tables...')
        db.drop_all()
        db.create_all()
        sys.exit(0)
    else:
        # Create tables if they don't already exist
        db.create_all()


# Set up routes
## User endpoints
app.add_url_rule('/user', view_func=users.create_user, methods=['POST'])
app.add_url_rule('/user', view_func=users.delete_user, methods=['DELETE'])
app.add_url_rule('/user/<string:username>', view_func=users.check_user)
app.add_url_rule('/user/login', view_func=users.login, methods=['POST'])
app.add_url_rule('/user/logout/<string:username>', view_func=users.logout)

## Trading endpoints
app.add_url_rule('/trade/user/<string:username>', 
    view_func=trades.get_trades_by_user)
app.add_url_rule('/trade/id/<int:id>', 
    view_func=trades.get_trade_by_id, methods=['GET'])
app.add_url_rule('/trade/id/<int:id>', 
    view_func=trades.delete_trade, methods=['DELETE'])
app.add_url_rule('/trade', view_func=trades.trade, methods=['POST'])

## Portfolio
app.add_url_rule('/trade/portfolio/<string:username>', 
    view_func=portfolio.get_portfolio)

## Home page
@app.route('/')
def home():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
