import { render, screen, fireEvent } from '@testing-library/react';
import Details from '../../components/Details';
import { AstronomicalObject } from '../../models/data.interface';
import { describe, it, expect, vi } from 'vitest';

const mockData: AstronomicalObject = {
  uid: '1',
  name: 'Object 1',
  astronomicalObjectType: 'Type 1',
  location: { uid: '1', name: 'Location 1' },
};

describe('Details Component', () => {
  it('displays the detailed card data', () => {
    render(<Details item={mockData} onClose={vi.fn()} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Type: ${mockData.astronomicalObjectType}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${mockData.location.name}`)
    ).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<Details item={mockData} onClose={onClose} />);

    fireEvent.click(screen.getByText(/🗙/i));
    expect(onClose).toHaveBeenCalled();
  });
});
