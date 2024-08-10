import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeContext';
import store from '../../store/store';
import App from '../../pages/_app';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { vi } from 'vitest';

vi.mock('../../components/Header', () => ({
  __esModule: true,
  default: ({ onEmulateError }: { onEmulateError: () => void }) => (
    <button onClick={onEmulateError}>Emulate Error</button>
  ),
}));

vi.mock('../../components/EmulateErrorComponent', () => ({
  __esModule: true,
  default: () => <div>Error Component</div>,
}));

describe('App Component', () => {
  const TestComponent = () => <div>Test Component</div>;

  const mockRouter: Partial<Router> = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    isLocaleDomain: false,
    isReady: true,
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    components: {},
    sdc: {},
    sbc: {},
    sub: vi.fn(),
    clc: vi.fn(),
  };

  const renderApp = (props: Partial<AppProps> = {}) =>
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App
            Component={TestComponent}
            pageProps={{}}
            router={mockRouter as Router}
            {...props}
          />
        </ThemeProvider>
      </Provider>
    );

  test('renders the header, main content, and footer', () => {
    renderApp();

    expect(screen.getByText('Emulate Error')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(
      screen.getByText('The Rolling Scopes School, 2024')
    ).toBeInTheDocument();
  });

  test('displays the EmulateErrorComponent when emulateError is true', () => {
    renderApp();

    fireEvent.click(screen.getByText('Emulate Error'));

    expect(screen.getByText('Error Component')).toBeInTheDocument();
  });
});
