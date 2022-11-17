import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>Something went wrong!</h1>
      <p>The page you are looking for doesn't exist.</p>
      <p>Click <Link to="/">here</Link> to go back home.</p>
    </div>
  )
}

export default NotFound;