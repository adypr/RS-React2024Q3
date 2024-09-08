import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PopupMenu from '../../components/PopupMenu';
import { describe, it, expect, vi } from 'vitest';
import { AstronomicalObject } from '../../models/data.interface';

describe('PopupMenu', () => {
  const mockUnselectAll = vi.fn();
  const mockOnDownload = vi.fn();

  const selectedItems: AstronomicalObject[] = [
    {
      uid: '1',
      name: 'Mars',
      astronomicalObjectType: 'Planet',
      location: { uid: 'solar-system', name: 'Solar System' },
    },
    {
      uid: '2',
      name: 'Jupiter',
      astronomicalObjectType: 'Planet',
      location: { uid: 'solar-system', name: 'Solar System' },
    },
  ];

  it('renders the selected items and buttons', () => {
    render(
      <PopupMenu
        selectedItems={selectedItems}
        onUnselectAll={mockUnselectAll}
        onDownload={mockOnDownload}
        isDownloading={false}
        downloadProgress={0}
      />
    );

    expect(screen.getByText('Selected 2 items:')).toBeInTheDocument();

    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Jupiter')).toBeInTheDocument();

    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('calls onUnselectAll when the unselect all button is clicked', () => {
    render(
      <PopupMenu
        selectedItems={selectedItems}
        onUnselectAll={mockUnselectAll}
        onDownload={mockOnDownload}
        isDownloading={false}
        downloadProgress={0}
      />
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockUnselectAll).toHaveBeenCalled();
  });

  it('calls onDownload when the download button is clicked', () => {
    render(
      <PopupMenu
        selectedItems={selectedItems}
        onUnselectAll={mockUnselectAll}
        onDownload={mockOnDownload}
        isDownloading={false}
        downloadProgress={0}
      />
    );

    fireEvent.click(screen.getByText('Download'));
    expect(mockOnDownload).toHaveBeenCalled();
  });

  it('displays loading state and progress bar during download', () => {
    render(
      <PopupMenu
        selectedItems={selectedItems}
        onUnselectAll={mockUnselectAll}
        onDownload={mockOnDownload}
        isDownloading={true}
        downloadProgress={50}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle('width: 50%');
  });
});
