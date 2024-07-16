import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

(global as unknown as { fetch: jest.Mock }).fetch = jest.fn();
fetchMock.enableMocks();
