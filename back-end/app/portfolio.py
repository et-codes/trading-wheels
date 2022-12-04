from flask import Response
from flask_login import current_user
from app import app, db, STARTING_CASH
from app.stocks import get_stock_quote
from app.models import Trade, User


class Position:

    def __init__(self, stock: dict) -> None:
        self.symbol = stock['symbol']
        self.description = stock['companyName']
        self.current_share_price = stock['latestPrice']
        self.current_value = 0
        self.total_shares = 0
        self.total_cost = 0
        self.gain = 0
    
    def add(self, trade: Trade) -> None:
        self.total_shares += trade.shares
        self.total_cost += trade.shares * trade.price
        self.current_value = self.total_shares * self.current_share_price
        if self.total_cost > 0:
            self.gain = (self.current_value / self.total_cost - 1) * 100
        else:
            self.gain = 0

    def json(self) -> dict:
        return {
            'symbol': self.symbol, 
            'description': self.description, 
            'shares': self.total_shares, 
            'cost': self.total_cost, 
            'value': self.current_value, 
            'gain_pct': self.gain
        }


@app.route('/api/portfolio')
def return_portfolio() -> Response:
    if current_user.is_authenticated:
        return get_portfolio(current_user), 200
    return 'Not authorized.', 401


def get_portfolio(user: User) -> list[dict]:
    positions = get_positions(user)
    summary = get_portfolio_summary(positions)
    
    return {'summary': summary, 'positions': positions}


def get_positions(user: User) -> list[dict]:
    """Compute positions for each individual stock"""
    all_trades = user.trades
    stocks = get_stocks(user)

    positions = []
    for symbol, stock_data in stocks.items():
        position = Position(stock_data)
        trades = list(filter(lambda t: t.symbol == symbol, all_trades))
        for trade in trades:
            position.add(trade)
        if position.total_shares == 0:
            # Delete trade history for stock if all shares are sold
            for trade in trades:
                db.session.delete(trade)
            db.session.commit()
        else:
            positions.append(position.json())
    
    positions.sort(key = lambda p: p['symbol'])

    return positions


def get_stocks(user: User) -> dict:
    """Get stock data for each distinct stock in user's trade history"""
    symbols = Trade.query.with_entities(Trade.symbol) \
        .filter_by(user=user).distinct().all()

    stock_prices = {}
    for symbol in symbols:
        stock_prices[symbol[0]] = get_stock_quote(symbol[0])

    return stock_prices


def get_portfolio_summary(positions: list[dict]) -> dict:
    """Calculate total stock and cash positions and total gain/loss"""
    total_stock_value = 0
    total_stock_cost = 0

    for position in positions:
        if position['symbol'] == '$CASH':
            total_cash = position['value']
        else:
            total_stock_value += position['value']
            total_stock_cost += position['cost']

    total_assets = total_stock_value + total_cash
    gain = (total_assets / STARTING_CASH - 1) * 100

    return {
        'stocks': total_stock_value,
        'cash': total_cash,
        'total': total_assets,
        'gain_pct': gain
    }