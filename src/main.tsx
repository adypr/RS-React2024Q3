import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './components/NotFoundPage';
import AstronomicalObjectsPage from './pages/AstronomicalObjectsPage';
import store from './store/store';
import './base/normalize.scss';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<AstronomicalObjectsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
