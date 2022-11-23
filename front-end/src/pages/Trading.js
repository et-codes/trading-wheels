import { Navigate } from 'react-router-dom';
// import { ErrorHandler } from '../utils';


const Trading = ({ username, setMessage }) => {

  // const errorHandler = new ErrorHandler(setMessage);

  if (!username) {
    setMessage({
      text: 'You must login to use the Trading page.',
      variant: 'warning'
    });
    return <Navigate to="/login" />;
  }

  return (
    <div>Trading Page</div>
  );
}

export default Trading;