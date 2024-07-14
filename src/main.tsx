import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import NotFoundPage from './components/NotFoundPage';

import './base/normalize.scss';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="details" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
