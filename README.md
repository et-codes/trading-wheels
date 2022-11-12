# trading-wheels-server

Trading Wheels is a stock trading simulator. This is the back end code.

## TODO list

- authenticate with tokens for all API calls after login.

## Notes

- trade_obj from client:
  {username, symbol, shares, price}
- portfolio object to client:
  [
  {symbol, description, shares, price, value, gain},
  ...,
  {stocks, cash, gain}
  ]
