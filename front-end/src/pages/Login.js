import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';


const Login = ({ setToken, setUsername }) => {

  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [rePasswordField, setRePasswordField] = useState('');
  const [newAccountCheck, setNewAccountCheck] = useState(false);
  const [alert, setAlert] = useState({});

  const loginMessage = 'Please log in below.  Check the "Register new account" ' +
    'box to create a new account.';

  const handleUsername = (event) => setUsernameField(event.target.value);
  const handlePassword = (event) => setPasswordField(event.target.value);
  const handleRePassword = (event) => setRePasswordField(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newAccountCheck) {
      if (await createAccount()) clearForm();
    } else {
      if (await login()) clearForm();
    }
  }

  const createAccount = async () => {
    if (passwordsMatch()) {
      try {
        const newUser = { username: usernameField, password: passwordField };
        const response = await axios.post('/user', newUser);
        setAlert({
          text: `New user '${response.data.username}' created!`,
          variant: 'success'
        });
        return true;
      } catch (error) {
        if (error.response.status === 400) {
          setAlert({
            text: `Username "${usernameField}" already exists.`,
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
    if (passwordField === rePasswordField) {
      return true;
    } else {
      setAlert({ text: 'Passwords do not match.', variant: 'danger' });
      setPasswordField('');
      setRePasswordField('');
      return false;
    }
  }

  const login = async () => {
    try {
      const user = { username: usernameField, password: passwordField };
      const response = await axios.post('/user/login', user);
      setToken(response.data);
      setUsername(usernameField);
      localStorage.setItem('token', response.data);
      localStorage.setItem('username', usernameField);
      setAlert({ text: `User '${usernameField}' logged in!`, variant: 'success' });
      return true;
    } catch (error) {
      console.error(error);
      setAlert({ text: error.response.data, variant: 'danger' });
      return false;
    }
  }

  const clearForm = () => {
    setUsernameField('');
    setPasswordField('');
    setRePasswordField('');
    setNewAccountCheck(false);
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
        checked={newAccountCheck}
        onChange={() => setNewAccountCheck(!newAccountCheck)}
      />
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Control className="mb-2"
          type="text"
          placeholder="Username"
          value={usernameField}
          onChange={handleUsername}
        />
        <Form.Control className="mb-2"
          type="password"
          placeholder="Password"
          value={passwordField}
          onChange={handlePassword}
        />
        {newAccountCheck && <Form.Control className="mb-2 "
          type="password"
          placeholder="Re-enter password"
          value={rePasswordField}
          onChange={handleRePassword}
        />}
        <Button variant="primary" type="submit">
          {newAccountCheck ? 'Register' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;