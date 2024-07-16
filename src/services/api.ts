import { mainData } from '../models/data.interface';

export const fetchData = (
  currentPage: number,
  searchQuery: string
): Promise<mainData> => {
  let apiUrl = `https://stapi.co/api/v2/rest/astronomicalObject/search?pageNumber=${currentPage - 1}&pageSize=10`;
  if (searchQuery) {
    apiUrl += `&name=${searchQuery}`;
  }

  return fetch(apiUrl, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  }).then((response) => response.json());
};
