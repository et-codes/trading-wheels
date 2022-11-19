import { Navigate } from 'react-router-dom';


const Portfolio = ({ username }) => {

  if (!username) return <Navigate to="/" />;

  return (
    <div>Portfolio Page</div>
  );
}

export default Portfolio;