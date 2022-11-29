import { Image } from 'react-bootstrap';
import { BoldLink, LoginButton } from '../components';
import photo from './images/stock.jpg';


const Home = ({ username }) => {
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
            <BoldLink to="/trading">Trading</BoldLink> and{' '}
            <BoldLink to="/portfolio">Portfolio</BoldLink> pages.
          </p>
          <p>
            <BoldLink to="/trading">Trading</BoldLink> - here is where you can
            search for stocks and see stock details. You can also trade in any{' '}
            stocks that appear in your results.
          </p>
          <p>
            <BoldLink to="/portfolio">Portfolio</BoldLink> - this is the place
            to see your entire portfolio - cash balance, stock assets, and
            your active positions.
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
      {!username && <LoginButton />}
    </div>
  );
}

export default Home;