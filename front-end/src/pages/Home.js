import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import photo from '../assets/tyler-prahm-lmV3gJSAgbo-unsplash.jpg';


const Home = () => {
  return (
    <div>
      <p>Welcome to <span className="text-primary font-weight-bold">Trading Wheels</span>, a fantasy stock-trading simulation where you can practice your investing skills!</p>
      <p>To get started, register a new account on our <Link to="/login"><span className="text-primary font-weight-bold">Login</span></Link> page. You'll start with $100,000 virutal cash to start buying stocks. Once you're logged in, you'll have acccess to the Trade and Portfolio pages.</p>
      <Image src={photo} fluid rounded className="shadow" />
      <p className="text-muted">
        Photo by <a href="https://unsplash.com/@tprahm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tyler Prahm</a> on <a href="https://unsplash.com/s/photos/investing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </p>

    </div>
  );
}

export default Home;