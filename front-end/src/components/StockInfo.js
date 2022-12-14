import { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { StockChart } from './';
import BarLoader from 'react-spinners/BarLoader';
import httpClient from '../utils/httpClient';
import { currency } from '../utils/format';


const StockInfo = ({ symbol }) => {

  const [show, setShow] = useState(false);
  const [company, setCompany] = useState({});
  const [quote, setQuote] = useState({});
  const [chart, setChart] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const MAX_LENGTH = 512;

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
    setChart(response.data.chart);
  }

  return (
    <>
      <Button
        key={symbol}
        variant="info"
        size="sm"
        onClick={handleShow}
        className="py-0"
        disabled={symbol === '$CASH'}
      >
        {symbol}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{company.companyName} ({symbol})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            chart.length > 0
              ? (
                <>
                  <Table size="sm">
                    <tbody>
                      <tr>
                        <td className="text-muted">Latest price/share:</td>
                        <td>{currency(quote.latestPrice)}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">CEO:</td>
                        <td>{company.CEO}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Exchange:</td>
                        <td>{quote.primaryExchange}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Location:</td>
                        <td>
                          {company.city}{company.city && ', '}
                          {company.state}{company.state && ', '}
                          {company.country}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <StockChart chart={chart} symbol={symbol} />
                  <hr />
                  <p className="text-muted">
                    {String(company.description).length > MAX_LENGTH
                      ? company.description.slice(0, MAX_LENGTH) + '...'
                      : company.description}
                  </p>
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

export default StockInfo;