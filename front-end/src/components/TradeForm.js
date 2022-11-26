import httpClient from "../utils/httpClient";
import { useState } from 'react';
import { Alert, Button, ButtonGroup, Form } from 'react-bootstrap'
import { currency } from "../utils/format";


const TradeForm = ({ sharesOwned, cash, price, symbol }) => {

  const [buySelected, setBuySelected] = useState(true);
  const [sellSelected, setSellSelected] = useState(false);
  const [shares, setShares] = useState('');
  const [alert, setAlert] = useState({});

  const buyPower = Math.floor(cash / price);
  const tradeMessage = 'Select BUY or SELL and enter # of shares to trade.';

  const handleClickBuy = () => {
    setBuySelected(true);
    setSellSelected(false);
  };

  const handleClickSell = () => {
    setBuySelected(false);
    setSellSelected(true);
  };

  const submitTrade = async (event) => {
    event.preventDefault();
    if (tradeIsValid()) {
      const action = buySelected ? 'Buying' : 'Selling';
      setAlert({
        text: `${action} ${shares} shares of ${symbol}...`,
        variant: 'success'
      });

      try {
        const sharesWithSign = buySelected
          ? parseInt(shares)
          : parseInt(shares) * -1;
        const tradeObject = {
          'symbol': symbol,
          'shares': sharesWithSign,
          'price': price
        }
        await httpClient.post('/api/trade', tradeObject);
        setAlert({
          text: `${action} ${shares} shares of ${symbol}...DONE!`,
          variant: 'success'
        });
      } catch (error) {
        console.error(error);
        setAlert({ text: 'Error executing trade.', variant: 'danger' });
      }
    }
  };

  const resetShares = () => {
    setShares('');
    setAlert({});
  }

  const tradeIsValid = () => {
    if (!shares) {
      setAlert({
        text: 'Please enter quantity of shares to trade.',
        variant: 'warning'
      });
      return false;
    }
    if (sellSelected && shares > sharesOwned) {
      setAlert({
        text: `You only own ${sharesOwned} shares.`,
        variant: 'warning'
      });
      return false;
    }
    if (buySelected && shares * price > cash) {
      setAlert({
        text: `You only have enough cash for ${buyPower} shares.`,
        variant: 'warning'
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <Alert variant={alert.variant || 'primary'}>
        {alert.text || tradeMessage}
      </Alert>
      <Form onSubmit={submitTrade} className="mb-3 d-md-flex">
        <ButtonGroup className="mr-1">
          <Button
            variant={buySelected ? "primary" : "outline-primary"}
            onClick={handleClickBuy}
          >
            Buy
          </Button>
          <Button
            variant={sellSelected ? "primary" : "outline-primary"}
            onClick={handleClickSell}
          >
            Sell
          </Button>
        </ButtonGroup>
        <Form.Control
          type="number"
          placeholder="Enter # of shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
        />
        <ButtonGroup className="ml-1">
          <Button type="submit" variant="outline-primary">
            Trade
          </Button>
          <Button variant="outline-danger" onClick={resetShares}>
            Reset
          </Button>
        </ButtonGroup>
      </Form>
      <h5 className="d-flex justify-content-between">
        <span>Trade value ({buySelected ? 'BUY' : 'SELL'}): </span>
        <span>
          {shares ? currency(shares * price) : currency(0)}
        </span>
      </h5>
      <h5 className="d-flex justify-content-between">
        <span>Cash after trade: </span>
        <span>
          {buySelected
            ? currency(cash - shares * price)
            : currency(cash + shares * price)}
        </span>
      </h5>
    </>
  );
};

export default TradeForm;