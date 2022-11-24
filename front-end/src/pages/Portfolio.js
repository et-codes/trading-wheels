import httpClient from "../utils/httpClient";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Summary, Positions } from '../components';
import BarLoader from 'react-spinners/BarLoader';


const Portfolio = ({ username, setMessage }) => {

  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const get_portfolio = async () => {
      try {
        const response = await httpClient.get(`/portfolio`);
        setPortfolio(response.data);
      } catch (error) {
        setMessage({ text: error, variant: 'warning' });
      }
    };
    get_portfolio();
  }, [username, setMessage]);

  if (!username) {
    setMessage({
      text: 'You must login to use the Portfolio page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

  return (
    <>
      {portfolio
        ? (
          <div>
            <h2>Portfolio Summary</h2>
            <Summary summary={portfolio.summary} />
            <h2>Positions</h2>
            <Positions positions={portfolio.positions} />
          </div>
        )
        : (
          <div className="d-flex align-items-center justify-content-center">
            <BarLoader color={'#325D88'} />
          </div>
        )
      }
    </>
  );
}

export default Portfolio;