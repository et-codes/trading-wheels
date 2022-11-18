import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  const [activeKey, setActiveKey] = useState('');
  const handleSelect = (eventKey) => setActiveKey(eventKey);
  // How to identify the active page when refreshing screen?

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <NavbarBrand href="/">Trading Wheels</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto" onSelect={handleSelect} activeKey={activeKey}>
            <Nav.Link as={NavLink} to="/" eventKey="1">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/trading" eventKey="2">Trading</Nav.Link>
            <Nav.Link as={NavLink} to="/portfolio" eventKey="3">Portfolio</Nav.Link>
            <Nav.Link as={NavLink} to="/about" eventKey="4">About</Nav.Link>
            <Nav.Link as={NavLink} to="/login" eventKey="5">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;