import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Router>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </Router>
  );
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Pagination Component', () => {
  test('displays correct active page button', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        page: { totalPages: 5 },
        astronomicalObjects: [],
      })
    );

    renderWithRouter(<App />, { route: '/?page=1' });

    const activeButton = screen.getByText('1');
    await waitFor(() => {
      expect(activeButton).toHaveClass('active');
    });
  });

  test('disables previous button on first page', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        page: { totalPages: 5 },
        astronomicalObjects: [],
      })
    );

    renderWithRouter(<App />, { route: '/?page=1' });

    const prevButton = screen.getByText('<');
    await waitFor(() => {
      expect(prevButton).toBeDisabled();
    });
  });

  test('disables next button on last page', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        page: { totalPages: 5 },
        astronomicalObjects: [],
      })
    );

    renderWithRouter(<App />, { route: '/?page=5' });

    const nextButton = screen.getByText('>');
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });
});
