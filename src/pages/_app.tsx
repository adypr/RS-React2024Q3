import React, { useState } from 'react';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.scss';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import store from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [emulateError, setEmulateError] = useState(false);

  const handleThrowError = () => {
    setEmulateError(true);
  };

  if (emulateError) {
    throw new Error('Emulate error!');
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Header onEmulateError={handleThrowError} />
          <main>
            <Component {...pageProps} />
          </main>
          <footer className="footer">
            <div className="wrapper">The Rolling Scopes School, 2024</div>
          </footer>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
