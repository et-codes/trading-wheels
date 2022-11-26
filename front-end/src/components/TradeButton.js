import httpClient from '../utils/httpClient';
import { useState, useEffect } from 'react';
import { Button, Modal, Table } from "react-bootstrap";
import { currency } from '../utils/format';
import BarLoader from 'react-spinners/BarLoader';


const TradeButton = ({ id: symbol }) => {

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

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{company.companyName} ({symbol})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            quote.latestPrice
              ? (
                <>
                  <Table size="sm">
                    <tbody>
                      <tr>
                        <td className="text-muted">Latest price/share:</td>
                        <td>{currency(quote.latestPrice)}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Owned shares:</td>
                        <td>9999</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Cash balance:</td>
                        <td>9999</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Buying power (shares):</td>
                        <td>Cash / share price</td>
                      </tr>
                    </tbody>
                  </Table>
                  <hr />
                  <p>Trade form goes here.</p>
                </>
              )
              : (
                <div className="d-flex mt-5 justify-content-center">
                  <BarLoader color={'#325D88'} />
                </div>
              )
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TradeButton;