import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SortByModal from '../../src/components/SortByModal';

describe('SortByModal', () => {
  const onClose = jest.fn();
  const applyFilters = jest.fn();
  const setSortBy = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    applyFilters.mockClear();
    setSortBy.mockClear();
  });

  it('calls applyFilters function when "Apply" button is pressed', () => {
    const { getByText } = render(
      <SortByModal visible={true} sortBy="Price" setSortBy={setSortBy} onClose={onClose} applyFilters={applyFilters} />
    );
    const applyButton = getByText('Apply');
    fireEvent.press(applyButton);
    expect(applyFilters).toHaveBeenCalledTimes(1);
  });
});
