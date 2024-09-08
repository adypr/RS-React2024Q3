import { describe, it, expect, vi } from 'vitest';
import { fetchAstronomicalObjects } from '../../services/api';

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch astronomical objects successfully', async () => {
    const mockResponse = {
      astronomicalObjects: [
        {
          name: 'Earth',
          astronomicalObjectType: 'Planet',
          location: { name: 'Solar System', uid: 'loc1' },
          uid: '1',
        },
      ],
      page: {
        firstPage: true,
        lastPage: true,
        numberOfElements: 1,
        pageNumber: 1,
        pageSize: 10,
        totalElements: 1,
        totalPages: 1,
      },
      sort: {
        clauses: [],
      },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const data = await fetchAstronomicalObjects({ currentPage: 1, searchQuery: 'Earth' });

    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=0&pageSize=10&name=Earth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  });

  it('should throw an error if fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response)
    );

    await expect(fetchAstronomicalObjects({ currentPage: 1, searchQuery: 'Earth' }))
      .rejects
      .toThrow('Failed to fetch data: Internal Server Error');

    expect(global.fetch).toHaveBeenCalled();
  });
});
