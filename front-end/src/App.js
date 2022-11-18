import { Routes, Route } from 'react-router-dom';
import { About, Home, Login, NotFound, Portfolio, Trading } from './pages';
import { Header, Footer } from './components';
import { Container } from 'react-bootstrap';


const App = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
