import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BoldLink } from '../components';
import photo from '../assets/tyler-prahm-lmV3gJSAgbo-unsplash.jpg';


const Home = () => {
  const links = {
    tyler: "https://unsplash.com/@tprahm?utm_source=unsplash&" +
      "utm_medium=referral&utm_content=creditCopyText",
    unsplash: "https://unsplash.com/s/photos/investing?utm_source=unsplash" +
      "&utm_medium=referral&utm_content=creditCopyText"
  };

  return (
    <div>
      <div className="d-flex">
        <div className="col-4">
          <p>
            Welcome to{' '}
            <span className="text-primary font-weight-bold">
              Trading Wheels
            </span>,
            a fantasy stock-trading simulation where you can practice your
            investing skills!
          </p>
          <p>
            To get started, register a new account on our{' '}
            <BoldLink to="/login">Login</BoldLink> page.
            You'll start with{' '}
            <span className="text-success fw-bold">$100,000</span>{' '}
            virutal cash to start buying stocks. Once you're logged in,
            you'll have acccess to the{' '}
            <BoldLink to="/trade">Trade</BoldLink> and{' '}
            <BoldLink to="/portfolio">Portfolio</BoldLink> pages.
          </p>
        </div>
        <div className="col-8">
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
        </div>
      </div>
      <div className="d-grid gap-2 mt-3">
        <Button variant="primary" size="lg" as={Link} to="/login">
          Log in to get started!
        </Button>
      </div>
    </div>
  );
}

export default Home;