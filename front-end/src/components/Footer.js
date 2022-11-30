import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar className="mt-auto" bg="light" variant="light">
      <Container>
        <span>
          &copy;2022{' '}
          <a
            href="https://www.linkedin.com/in/ethornton/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eric Thornton
          </a>
        </span>
        <a
          href="https://github.com/et-codes/trading-wheels"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://iexcloud.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data provided by IEX Cloud
        </a>
      </Container>
    </Navbar>
  );
}

export default Footer;