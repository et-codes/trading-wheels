import httpClient from '../utils/httpClient';
import { useState, useEffect } from 'react';
import { Button, Modal, Table } from "react-bootstrap";
import { currency, number } from '../utils/format';
import { TradeForm } from './';
import BarLoader from 'react-spinners/BarLoader';


const TradeButton = ({ id: symbol, portfolio, setTradeComplete }) => {

  const [company, setCompany] = useState({});
  const [quote, setQuote] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show && symbol !== '$CASH') {
      getStockData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, symbol]);

  const getStockData = async () => {
    const response = await httpClient.get(`/api/stock/${symbol}`);
    setCompany(response.data.company);
    setQuote(response.data.quote);
  }

  const positionsOwned = portfolio.positions
    .filter((position) => position.symbol === symbol);
  const sharesOwned = positionsOwned.length > 0
    ? positionsOwned[0].shares
    : 0;
  const cash = portfolio.summary.cash;

  return (
    <>
      <Button
        id={symbol}
        variant="primary"
        size="sm"
        onClick={() => setShow(true)}
        className="py-0"
      >
        Trade
      </Button>

      <Modal show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{company.companyName} ({symbol})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quote.latestPrice
            ? (
              <>
                <Table size="sm">
                  <tbody>
                    <tr>
                      <td className="text-muted">Latest price/share:</td>
                      <td>{currency(quote.latestPrice)}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Shares owned:</td>
                      <td>{number(sharesOwned)}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Cash balance:</td>
                      <td>{currency(cash)}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Buying power:</td>
                      <td>{Math.floor(cash / quote.latestPrice)} shares</td>
                    </tr>
                  </tbody>
                </Table>
                <hr />
                <TradeForm
                  symbol={symbol}
                  sharesOwned={sharesOwned}
                  cash={cash}
                  price={quote.latestPrice}
                  setTradeComplete={setTradeComplete}
                />
              </>
            )
            : (
              <div className="d-flex mt-5 justify-content-center">
                <BarLoader color={'#325D88'} />
              </div>
            )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TradeButton;