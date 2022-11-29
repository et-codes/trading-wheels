import httpClient from "../utils/httpClient";
import { useState, useEffect, useCallback } from 'react';
import { LoginButton, Summary, Positions } from '../components';
import BarLoader from 'react-spinners/BarLoader';


const Portfolio = ({ username, setMessage }) => {

  const [portfolio, setPortfolio] = useState(null);
  const [tradeComplete, setTradeComplete] = useState(false);

  const getPortfolio = useCallback(async () => {
    try {
      const response = await httpClient.get(`/api/portfolio`);
      setPortfolio(response.data);
    } catch (error) {
      setMessage({ text: error, variant: 'warning' });
    }
  }, [setMessage]);

  useEffect(() => {
    if (username) getPortfolio();
  }, [username, getPortfolio]);

  useEffect(() => {
    if (!username) setMessage({
      text: 'You must log in to use the Portfolio page.',
      variant: 'warning'
    });
  }, [username, setMessage]);

  useEffect(() => {
    if (tradeComplete) {
      setTradeComplete(false);
      getPortfolio();
    }
  }, [tradeComplete, getPortfolio]);

  if (!username) return <LoginButton />;

  return (
    <>
      {portfolio
        ? (
          <div>
            <h2>Portfolio Summary</h2>
            <Summary summary={portfolio.summary} />
            <h2>Positions</h2>
            <Positions portfolio={portfolio} setTradeComplete={setTradeComplete} />
          </div>
        )
        : (
          <div className="d-flex mt-5 justify-content-center">
            <BarLoader color={'#325D88'} />
          </div>
        )
      }
    </>
  );
}

export default Portfolio;