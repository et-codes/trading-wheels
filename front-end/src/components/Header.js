import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Header = ({ user }) => {
  const accountLink = user
    ? <Nav.Link as={NavLink} to="/logout">Logout [ {user} ]</Nav.Link>
    : <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
    ;

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <NavbarBrand>Trading Wheels</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/trading">Trading</Nav.Link>
            <Nav.Link as={NavLink} to="/portfolio">Portfolio</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            {accountLink}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;