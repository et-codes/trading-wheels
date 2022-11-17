import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trading Wheels on the screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Trading Wheels/i);
  expect(linkElement).toBeInTheDocument();
});
