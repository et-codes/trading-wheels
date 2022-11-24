import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorHandler } from '../utils';


const Logout = ({ username, setUsername, setMessage }) => {


  useEffect(() => {
    const errorHandler = new ErrorHandler(setMessage);
    const logout = async () => {
      try {
        const response = await axios.post(`user/logout`, { username });
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setUsername('');
        setMessage({ text: `Logged out ${response.data}.`, variant: 'secondary' });
      } catch (error) {
        errorHandler.log(error);
      }
    };
    if (username) logout();
  }, [username, setUsername, setMessage]);

  return (
    <Navigate to="/" />
  );
}

export default Logout;