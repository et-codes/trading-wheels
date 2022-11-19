import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { About, Home, Login, Logout, NotFound, Portfolio, Trading } from './pages';
import { Header, Footer, InfoBar } from './components';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('username') || '');
  const [message, setMessage] = useState({ text: '', variant: '' });


  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);


  useEffect(() => {
    if (message.text) {
      setTimeout(() => setMessage({ text: '', variant: '' }), 3000);
    }
  }, [message]);


  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header user={user} />
      {message.text && <InfoBar message={message} />}
      <Container className="py-3">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={
            <Login setToken={setToken} setUser={setUser} />
          } />
          <Route path="/logout" element={
            <Logout user={user} setUser={setUser} setMessage={setMessage} />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
