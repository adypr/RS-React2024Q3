import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../App';
import store from '../../store/store';

describe('Main App rendering', () => {
  test('renders main components correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Star Trek/i)).toBeInTheDocument();
    expect(screen.getByText(/Astronomical Objects/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The Rolling Scopes School, 2024/i)
    ).toBeInTheDocument();
  });
});
