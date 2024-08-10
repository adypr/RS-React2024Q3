import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Details from '../../components/Details';
import { AstronomicalObject } from '../../models/data.interface';
import { describe, it, expect, vi } from 'vitest';

const mockData: AstronomicalObject = {
  uid: '1',
  name: 'Object 1',
  astronomicalObjectType: 'Type 1',
  location: { uid: '1', name: 'Location 1' },
};

const mockDataWithNullLocation: AstronomicalObject = {
  uid: '2',
  name: 'Object 2',
  astronomicalObjectType: 'Type 2',
  location: { uid: null, name: null },
};

describe('Details Component', () => {
  it('displays "Unknown location" if location data is missing', async () => {
    render(<Details item={mockDataWithNullLocation} onClose={vi.fn()} />);

    expect(screen.getByText(mockDataWithNullLocation.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Type: ${mockDataWithNullLocation.astronomicalObjectType}`
      )
    ).toBeInTheDocument();

    const locationElement = screen.getByText(/Location:/i);

    const locationText = within(locationElement).getByText(/Unknown location/i);
    expect(locationText).toBeInTheDocument();
  });

  it('renders different astronomical object types correctly', () => {
    const differentTypeData: AstronomicalObject = {
      ...mockData,
      astronomicalObjectType: 'Type 3',
    };

    render(<Details item={differentTypeData} onClose={vi.fn()} />);

    expect(
      screen.getByText(`Type: ${differentTypeData.astronomicalObjectType}`)
    ).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<Details item={mockData} onClose={onClose} />);

    fireEvent.click(screen.getByText(/🗙/i));
    expect(onClose).toHaveBeenCalled();
  });
});
