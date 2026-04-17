import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders UpworkUtils navbar brand', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const brandElement = screen.getByText(/UpworkUtils/i);
  expect(brandElement).toBeInTheDocument();
});
