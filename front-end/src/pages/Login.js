import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [alert, setAlert] = useState({});

  const loginMessage = 'Please log in below.  Check the "Register new account" ' +
    'box to create a new account.';

  const handleUsername = (event) => setUsername(event.target.value);

  const handlePassword = (event) => setPassword(event.target.value);

  const handleRePassword = (event) => setRePassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
  }

  const createAccount = async () => {
    //
  }

  const login = async () => {
    //
  }

  const clearForm = () => {
    setUsername('');
    setPassword('');
    setRePassword('');
    setNewAccount(false);
  }


  return (
    <Container>
      <Alert variant={alert.variant || 'primary'}>
        {alert.text || loginMessage}
      </Alert>
      <Form.Check
        className="mb-3"
        type="checkbox"
        label="Register new account"
        onChange={() => setNewAccount(!newAccount)}
      />
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Control className="mb-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <Form.Control className="mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        {newAccount && <Form.Control className="mb-2 "
          type="password"
          placeholder="Re-enter password"
          value={rePassword}
          onChange={handleRePassword}
        />}
        <Button variant="primary" type="submit">
          {newAccount ? 'Register' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;