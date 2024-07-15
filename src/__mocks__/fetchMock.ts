export const mockFetchData = {
  astronomicalObjects: [
    {
      uid: '1',
      name: 'Object 1',
      astronomicalObjectType: 'Type 1',
      location: { name: 'Location 1' },
    },
    {
      uid: '2',
      name: 'Object 2',
      astronomicalObjectType: 'Type 2',
      location: { name: 'Location 2' },
    },
  ],
  page: { totalPages: 1 },
};

export const mockFetchEmptyData = {
  astronomicalObjects: [],
  page: { totalPages: 1 },
};
