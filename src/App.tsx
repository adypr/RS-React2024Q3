import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import { ThemeProvider } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const [emulateError, setEmulateError] = useState(false);

  const handleThrowError = () => {
    setEmulateError(true);
  };

  if (emulateError) {
    throw new Error('Emulate error!');
  }

  return (
    <>
      <Header onEmulateError={handleThrowError} />
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="wrapper">The Rolling Scopes School, 2024</div>
      </footer>
    </>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
