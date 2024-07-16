import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import useSearchLs from './hooks/useSearchLs';
import './App.scss';

const App: React.FC = () => {
  const [searching, setSearching] = useSearchLs('');
  const [emulateError, setEmulateError] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearching(value);
  };

  const handleThrowError = () => {
    setEmulateError(true);
  };

  if (emulateError) {
    throw new Error('Emulate error!');
  }

  return (
    <>
      <Header
        searching={searching}
        onSearchChange={handleSearchChange}
        onEmulateError={handleThrowError}
      />
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="wrapper">The Rolling Scopes School, 2024</div>
      </footer>
    </>
  );
};

export default App;
