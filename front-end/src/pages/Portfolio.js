import { Navigate } from 'react-router-dom';


const Portfolio = ({ username, setMessage }) => {

  if (!username) {
    setMessage({
      text: 'You must login to use the Portfolio page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

  return (
    <div>Portfolio Page</div>
  );
}

export default Portfolio;