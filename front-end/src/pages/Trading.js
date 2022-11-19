import { Navigate } from 'react-router-dom';


const Trading = ({ username }) => {

  if (!username) return <Navigate to="/" />;

  return (
    <div>Trading Page</div>
  );
}

export default Trading;