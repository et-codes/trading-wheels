# trading-wheels-server

Trading Wheels is a stock trading simulator. This is the back end code.

## TODO list

- change POST success returns to location header w/ 201 status

## Notes

- trade_obj from client:
  {username, symbol, shares, price}
- portfolio object to client:
  [
  {symbol, description, shares, price, value, gain},
  ...,
  {stocks, cash, gain}
  ]
