import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { expect, test, vi } from 'vitest';
import store from '../../store/store';
import App from '../../App';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ThemeProvider } from '../../context/ThemeContext';

test('renders header and footer', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );

  expect(
    screen.getByText('The Rolling Scopes School, 2024')
  ).toBeInTheDocument();
  expect(screen.getByText('Star Trek')).toBeInTheDocument();
  expect(screen.getByText('Astronomical Objects')).toBeInTheDocument();
});

test('emulates error on button click', async () => {
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );

  const errorButton = screen.getByText('Emulate Error');
  expect(errorButton).toBeInTheDocument();

  errorButton.click();

  await waitFor(() => {
    expect(
      screen.getByText('Something went wrong. Please reload app.')
    ).toBeInTheDocument();
  });

  consoleErrorMock.mockRestore();
});
