from app import app, db
from app.models import Stock, MetaData
from datetime import datetime, timedelta, timezone
from flask_login import current_user
from app.iex import quote, get_symbols, batch_quote
from sqlalchemy.sql import func, or_


CASH = {
    "symbol": "$CASH",
    "companyName": "Cash",
    "latestPrice": 1.0,
    "primaryExchange": "-",
}


@app.route("/api/stock/search/<string:fragment>")
def return_stock_search_result(fragment):
    if not current_user.is_authenticated:
        return "Not authorized.", 401
    return get_stock_search_result(fragment)


@app.route("/api/stock/<string:symbol>")
def return_stock_data(symbol):
    if not current_user.is_authenticated:
        return "Not authorized.", 401
    if symbol == "$CASH":
        return CASH
    return quote(symbol)


def get_stock_quote(symbol: str):
    if symbol == "$CASH":
        return CASH
    return quote(symbol)["quote"]


def get_batch_quote(symbols: list[str]):
    if "$CASH" in symbols:
        symbols.remove("$CASH")
        add_cash = True
    batch = batch_quote(symbols)
    if add_cash:
        batch["$CASH"] = CASH
    return batch


def get_stock_search_result(fragment):
    check_for_stale_symbol_list()
    stocks = Stock.query.filter(
        or_(
            Stock.description.ilike(f"%{fragment}%"),
            Stock.symbol.ilike(f"%{fragment}%"),
        )
    ).all()
    return [stock.json() for stock in stocks]


def check_for_stale_symbol_list():
    last_update = MetaData.query.filter(MetaData.key == "last_stock_update").first()
    now = datetime.now(timezone.utc)
    if last_update is None or last_update.updated <= now - timedelta(hours=24):
        print("Refreshing stock symbol table...")
        refresh_symbols()


def refresh_symbols():
    delete_stale_symbols()
    symbol_list = get_symbols()
    for symbol in symbol_list:
        stock = Stock(symbol=symbol["symbol"], description=symbol["name"])
        db.session.add(stock)
    db.session.commit()
    set_last_update()


def set_last_update():
    last_update = MetaData.query.filter(MetaData.key == "last_stock_update").first()
    if last_update is None:
        last_update = MetaData(key="last_stock_update", updated=func.now())
        db.session.add(last_update)
    else:
        last_update.updated = func.now()
    db.session.commit()


def delete_stale_symbols():
    Stock.query.delete()
    db.session.commit()
