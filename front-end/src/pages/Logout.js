import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import httpClient from "../utils/httpClient";


const Logout = ({ username, setUsername, setMessage }) => {

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await httpClient.post(`/apiuser/logout`, { username });
        setUsername('');
        setMessage({ text: `Logged out ${response.data}.`, variant: 'secondary' });
      } catch (error) {
        setMessage({ text: error, variant: 'warning' })
      }
    };
    if (username) logout();
  }, [username, setUsername, setMessage]);

  return (
    <Navigate to="/" />
  );
}

export default Logout;