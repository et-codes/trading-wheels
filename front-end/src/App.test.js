import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders "Trading Wheels" on the home screen', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const titleText = screen.getAllByText(/Trading Wheels/i);
  expect(titleText[0]).toBeInTheDocument();
});

test('renders "Please log in below" on login screen.', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const loginText = screen.getByText(/Please log in below/i);
  expect(loginText).toBeInTheDocument();
});