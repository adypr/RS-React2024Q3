import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { mockFetchData, mockFetchEmptyData } from '../__mocks__/fetchMock';

type FetchMock = jest.MockedFunction<typeof fetch>;

const fetchMock = global.fetch as FetchMock;

const mockResponse = (data: unknown): Response => {
  return {
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic',
    url: '',
    clone: () => mockResponse(data),
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve(''),
  } as Response;
};

fetchMock.mockImplementation(() =>
  Promise.resolve(mockResponse(mockFetchData))
);

describe('CardList Component', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorage.clear();
  });

  test('renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const cards = await screen.findAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);
  });

  test('displays "Nothing found" if no cards are present', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve(mockResponse(mockFetchEmptyData))
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const nothingFoundMessage = await screen.findByText('Nothing found');
    expect(nothingFoundMessage).toBeInTheDocument();
  });
});
