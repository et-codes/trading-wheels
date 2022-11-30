import { Container, Col, Image, Row } from 'react-bootstrap';
import { LoginButton } from '../components';
import { Link } from 'react-router-dom';
import photo from './images/stock.jpg';


const Home = ({ username }) => {
  const links = {
    tyler: "https://unsplash.com/@tprahm?utm_source=unsplash&" +
      "utm_medium=referral&utm_content=creditCopyText",
    unsplash: "https://unsplash.com/s/photos/investing?utm_source=unsplash" +
      "&utm_medium=referral&utm_content=creditCopyText"
  };

  return (
    <Container>
      <Row className="text-center text-primary mb-5">
        <h1>Welcome to Trading Wheels!</h1>
        <em className="h6 text-secondary">
          The fantasy stock-trading simulation where you can practice your
          investing skills with virtual money!
        </em>
      </Row>
      <Row>
        <Col md={5}>
          <h3 className="text-success fw-bold">$100,000 cash</h3>
          <hr className="my-1" />
          <p>It's yours to invest, in the virtual sense, of course! </p>
          <p>
            To get started, register a new account on our{' '}
            <Link to="/login">Login</Link> page.
          </p>
          <p>You'll start with $100,000 of virtual money in your account{' '}
            to start buying stocks. Once you're logged in,
            you'll have acccess to the{' '}
            <Link to="/trading">Trading</Link> and{' '}
            <Link to="/portfolio">Portfolio</Link> pages.
          </p>
          <Link to="/trading" className="h4 text-center">Trading</Link>
          <hr className="my-1" />
          <p>
            This is where you can search for stocks and see stock charts
            and company details. You can also trade any stocks that appear in
            your results.
          </p>
          <Link to="/portfolio" className="h4 text-center">Portfolio</Link>
          <hr className="my-1" />
          <p>
            Here, you can see the state of your entire portfolio - cash
            balance, stock assets, your active positions, and how much you've
            gained or lost since you created your account.
          </p>
        </Col>
        <Col>
          <Image src={photo} fluid rounded className="shadow" />
          <p className="text-muted text-center">
            Photo by{' '}
            <a href={links.tyler} target="_blank" rel="noopener noreferrer">
              Tyler Prahm
            </a> on{' '}
            <a href={links.unsplash} target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        {!username && <LoginButton />}
      </Row>
    </Container>
  );
}

export default Home;