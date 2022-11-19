import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { About, Home, Login, NotFound, Portfolio, Trading } from './pages';
import { Header, Footer } from './components';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('username') || '');


  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);


  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header user={user} />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={
            <Login setToken={setToken} setUser={setUser} />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
