import { render, screen } from '@testing-library/react';
import App from './App';
import Privacy from './screens/Privacy';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
