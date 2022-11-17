import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [activeKey, setActiveKey] = useState('');
  const handleSelect = (eventKey) => setActiveKey(eventKey);

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <NavbarBrand href="/">Trading Wheels</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto" onSelect={handleSelect} activeKey={activeKey}>
            <Nav.Link as={Link} to="/" eventKey="1">Home</Nav.Link>
            <Nav.Link as={Link} to="/trading" eventKey="2">Trading</Nav.Link>
            <Nav.Link as={Link} to="/portfolio" eventKey="3">Portfolio</Nav.Link>
            <Nav.Link as={Link} to="/about" eventKey="4">About</Nav.Link>
            <Nav.Link as={Link} to="/login" eventKey="5">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;