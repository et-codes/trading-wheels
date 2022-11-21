import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';


describe('<App />', () => {

  test('renders "Trading Wheels" on the home screen', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const titleText = screen.getAllByText(/Trading Wheels/i);
    expect(titleText[0]).toBeInTheDocument();
  });

});


describe('<Login />', () => {

  test('renders "Please log in below" on login screen.', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const loginText = screen.getByText(/Please log in below/i);
    expect(loginText).toBeInTheDocument();
  });

  test('renders form elements on login screen.', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const formElements = [
      'register-checkbox',
      'username-input',
      'password-input',
      'login-button'
    ];
    formElements.forEach((element) => {
      const screenElement = screen.getByTestId(element);
      expect(screenElement).toBeInTheDocument();
    });
  });

  test('checking register box reveals second password field', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const registerCheckbox = screen.getByTestId('register-checkbox');
    fireEvent.click(registerCheckbox);
    const passwordInput2 = screen.getByTestId('password-input-2');
    expect(passwordInput2).toBeInTheDocument();
  });

});
