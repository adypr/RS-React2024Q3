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

  it('should disable the previous button on the first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });

  it('should display all page buttons correctly', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
    );

    const pageButtons = screen.getAllByRole('button');
    const pageNumbers = pageButtons.map((button) => button.textContent);

    expect(pageNumbers).toEqual(['<', '1', '2', '3', '4', '5', '>']);
  });

  it('should display ellipsis for long page ranges', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );

    const pageButtons = screen.getAllByRole('button');
    const pageNumbers = pageButtons.map((button) => button.textContent);

    expect(pageNumbers).toEqual([
      '<',
      '1',
      '...',
      '3',
      '4',
      '5',
      '6',
      '7',
      '...',
      '10',
      '>',
    ]);
  });
});
