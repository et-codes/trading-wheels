import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';


const Login = ({ setToken, setUser }) => {

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
    if (newAccount) {
      if (await createAccount()) clearForm();
    } else {
      if (await login()) clearForm();
    }
  }

  const createAccount = async () => {
    if (passwordsMatch()) {
      try {
        const newUser = { username: username, password: password };
        const response = await axios.post('/user', newUser);
        setAlert({
          text: `New user '${response.data.username}' created!`,
          variant: 'success'
        });
        return true;
      } catch (error) {
        if (error.response.status === 400) {
          setAlert({
            text: `Username "${username}" already exists.`,
            variant: 'danger'
          });
        } else {
          setAlert({ text: error.response.data, variant: 'danger' });
        }
        return false;
      }
    }
  }

  const passwordsMatch = () => {
    if (password === rePassword) {
      return true;
    } else {
      setAlert({ text: 'Passwords do not match.', variant: 'danger' });
      setPassword('');
      setRePassword('');
      return false;
    }
  }

  const login = async () => {
    try {
      const user = { username: username, password: password };
      const response = await axios.post('/user/login', user);
      setToken(response.data);
      setUser(username);
      localStorage.setItem('token', response.data);
      localStorage.setItem('username', username);
      setAlert({ text: `User '${username}' logged in!`, variant: 'success' });
      return true;
    } catch (error) {
      setAlert({ text: error.response.data, variant: 'danger' });
      return false;
    }
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
        checked={newAccount}
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