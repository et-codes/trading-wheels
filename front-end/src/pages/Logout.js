import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Logout = ({ user, setUser, setAlert }) => {

  const logout = async () => {
    console.log('logout called.');
    try {
      const response = await axios.get(`user/logout/${user}`);
      setAlert({ text: `Logged out ${response.data}.`, variant: 'secondary' });
      setUser('');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    } catch (error) {
      setAlert({ text: error.response.data, variant: 'danger' });
      console.log(error.response.data);
    }
  }

  logout();

  return (
    <Navigate to="/" />
  );
}

export default Logout;