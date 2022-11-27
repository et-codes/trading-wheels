# Trading Wheels

Trading Wheels is a stock trading simulator, currently under development.

## TODO list

- Provide sharesOwned and cash to SearchResultsTable > TradeButton > TradeForm.
- ... and also to Portfolio > Positions > TradeButton > TradeForm.
- What to do after trade is executed?
- What happens in the front end when the server session is expired?
- Fix the damned bugs in the database hits for sessions.
- Check for error handling where needed.
- Write tests for the front end.
- Check if backend tests are working after changing to session authorization.

## Notes

- trade_obj from client:
  {symbol, shares, price}
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

## Server-side sessions

https://www.youtube.com/watch?v=sBw0O5YTT4Q&ab_channel=DevGuyAhnaf
