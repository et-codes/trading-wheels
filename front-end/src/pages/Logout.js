import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import httpClient from "../utils/httpClient";
import ErrorHandler from '../utils/errorHandler';


const Logout = ({ username, setUsername, setMessage }) => {


  useEffect(() => {
    const errorHandler = new ErrorHandler(setMessage);
    const logout = async () => {
      try {
        const response = await httpClient.post(`user/logout`, { username });
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