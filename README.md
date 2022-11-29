# Trading Wheels

Trading Wheels is a stock trading simulator, currently under development.

## TODO list

- Generate About page.
- Add type hints to the Python files functions.
- What happens in the front end when the server session is expired?
- Check for error handling where needed.
- Write tests for the front end.

## Notes

- trade_obj from client:
  {symbol, shares, price}
- portfolio object to client:
  [
  {symbol, description, shares, cost, value, gain_pct},
  ...,
  {stocks, cash, total, gain_pct}
  ]
