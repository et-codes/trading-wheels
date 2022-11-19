import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Logout = ({ username, setUsername, setMessage }) => {

  const logout = async () => {
    try {
      const response = await axios.get(`user/logout/${username}`);
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      setUsername('');
      setMessage({ text: `Logged out ${response.data}.`, variant: 'secondary' });
    } catch (error) {
      setMessage({ text: 'Error logging out.', variant: 'danger' });
      console.log(error.response.data);
    }
  }

  if (username) logout();

  return (
    <Navigate to="/" />
  );
}

export default Logout;