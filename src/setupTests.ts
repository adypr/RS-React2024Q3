import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

(global as unknown as { fetch: jest.Mock }).fetch = jest.fn();
