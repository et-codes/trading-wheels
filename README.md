# Trading Wheels

Trading Wheels is a stock trading simulator, currently under development.

## TODO list

- Add attribution to front end:
  <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
- Make front end

## Notes

- trade_obj from client:
  {username, symbol, shares, price}
- portfolio object to client:
  [
  {symbol, description, shares, cost, value, gain_pct},
  ...,
  {stocks, cash, total, gain_pct}
  ]

## IEX API notes

- Using Python module PyEX: https://iexcloud.io/blog/how-to-get-market-data-in-python
  https://pypi.org/project/pyEX/

- get list of symbols and company names:
  https://iexcloud.io/documentation/using-core-data/finding-symbols.html
  https://cloud.iexapis.com/stable/ref-data/symbols?filter=symbol,name&token={...}
- historical data for charting:
  https://iexcloud.io/docs/api/#historical-prices
  Example: https://cloud.iexapis.com/stable/stock/{symbol}/chart/3m?token={...}
- get company logo URL:
  /stock/{symbol}/logo
- get price only: /stock/{symbol}/price
- search stock symbols: /search/{fragment}
