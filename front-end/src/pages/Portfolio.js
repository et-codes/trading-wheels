import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorHandler } from '../utils';
import { Summary, Positions } from '../components';
import BarLoader from 'react-spinners/BarLoader';


const Portfolio = ({ username, setMessage }) => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    get_portfolio();
  }, []);

  const errorHandler = new ErrorHandler(setMessage);

  if (!username) {
    setMessage({
      text: 'You must login to use the Portfolio page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

  const get_portfolio = async () => {
    try {
      const response = await axios.get(`/portfolio/${username}`);
      setPortfolio(response.data);
    } catch (error) {
      errorHandler.log(error);
    }
  }

  return (
    <>
      {portfolio
        ? (
          <div>
            <Summary summary={portfolio.summary} />
            <Positions />
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