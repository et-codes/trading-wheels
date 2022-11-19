import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorHandler } from '../utils';


const Portfolio = ({ username, setMessage }) => {

  const [positions, setPositions] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => get_portfolio, [username]);

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
      setPositions(response.data.positions);
      setSummary(response.data.summary);
    } catch (error) {
      errorHandler.log(error);
    }
  }

  return (
    <div>
      Portfolio Page
    </div>

  );
}

export default Portfolio;