import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { describe, it, expect } from 'vitest';

describe('Pagination component', () => {
  it('should update URL query parameter when page changes', async () => {
    const history = createMemoryHistory();
    const handlePageChange = (page: number) => {
      const searchParams = new URLSearchParams(history.location.search);
      searchParams.set('page', page.toString());
      history.push({ search: searchParams.toString() });
    };

    render(
      <Router location={history.location} navigator={history}>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </Router>
    );

    const nextPageButton = screen.getByText('2');
    await userEvent.click(nextPageButton);

    expect(history.location.search).toContain('page=2');
  });
});
