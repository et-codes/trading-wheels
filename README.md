# Trading Wheels

Trading Wheels is a stock trading simulator, currently under development.

## TODO list

- Convert project to TypeScript.
- Redirect to ... portfolio? ... after logging in.
- Use cookies to store user info instead of localStorage.
- Check for error handling where needed.
- Write tests for the front end.
- Change "log in to get started!" button on home page to something else if the user is already logged in.

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
