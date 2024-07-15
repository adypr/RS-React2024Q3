import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search';

describe('Search Component', () => {
  const handleSearchChange = jest.fn();
  const handleSearchSubmit = jest.fn();

  beforeEach(() => {
    render(
      <Search
        searching="test"
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
    );
  });

  it('updates input value when typed into', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'star');

    expect(handleSearchChange).toHaveBeenCalled();
    expect(handleSearchChange).toHaveBeenCalledWith(expect.anything());
  });

  it('triggers search on button click', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(handleSearchSubmit).toHaveBeenCalledTimes(1);
  });
});
