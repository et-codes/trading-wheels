import httpClient from "./utils/httpClient";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { About, Home, Login, Logout, NotFound, Portfolio, Trading } from './pages';
import { Header, Footer, InfoBar } from './components';


const App = () => {

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState({ text: '', variant: '' });

  // Log in user if server session is still valid
  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/api/user");
        setUsername(resp.data);
      } catch (error) {
        console.log("Not authenticated.");
      }
    })();
  }, []);


  useEffect(() => {
    if (message.text) {
      setTimeout(() => setMessage({ text: '', variant: '' }), 5000);
    }
  }, [message]);


  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header username={username} />
      {message.text && <InfoBar message={message} />}
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<Home username={username} />} />
          <Route path="/trading" element={
            <Trading username={username} setMessage={setMessage} />
          } />
          <Route path="/portfolio" element={
            <Portfolio username={username} setMessage={setMessage} />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={
            <Login username={username} setUsername={setUsername} />
          } />
          <Route path="/logout" element={
            <Logout
              username={username}
              setUsername={setUsername}
              setMessage={setMessage} />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
