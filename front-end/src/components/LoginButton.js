import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const LoginButton = () => {

  return (
    <div className="d-grid gap-2 mt-3">
      <Button variant="primary" size="lg" as={Link} to="/login">
        Log in to get started!
      </Button>
    </div>
  );

};

export default LoginButton;