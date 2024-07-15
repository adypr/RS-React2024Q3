import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { mockFetchData } from '../__mocks__/fetchMock';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Card Component within App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockFetchData),
      } as Response)
    );
  });

  test('renders the relevant card data', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const cards = await screen.findAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);
  });
});
