import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmulateErrorComponent from '../../components/EmulateErrorComponent';

describe('EmulateErrorComponent', () => {
  it('should throw an error when the component is mounted', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<EmulateErrorComponent />)).toThrow(
      'Please note! This default Nextjs popup is only displayed in development mode. You can check the error emulation in production mode.'
    );

    consoleErrorSpy.mockRestore();
  });
});
