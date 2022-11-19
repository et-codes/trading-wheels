import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Logout = ({ user, setUser, setMessage }) => {

  const logout = async () => {
    try {
      const response = await axios.get(`user/logout/${user}`);
      setMessage({ text: `Logged out ${response.data}.`, variant: 'secondary' });
      setUser('');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    } catch (error) {
      setMessage({ text: 'Error logging out.', variant: 'danger' });
      console.log(error.response.data);
    }
  }

  if (user) logout();

  return (
    <Navigate to="/" />
  );
}

export default Logout;