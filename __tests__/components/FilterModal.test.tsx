import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FiltersModal from '../../src/components/FiltersModal';

describe('FiltersModal', () => {
  const props = {
    visible: true,
    onClose: jest.fn(),
    applyFilter: jest.fn(),
    clearFilter: jest.fn(),
    byArrival: false,
    setByArrival: jest.fn(),
    startHour: 0,
    setStartHour: jest.fn(),
    endHour: 6,
    setEndHour: jest.fn(),
    aircraft: 'Boeing 737',
    setAircraft: jest.fn(),
    airline: 'IndiGo',
    setAirline: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<FiltersModal {...props} />);
    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('Departure')).toBeTruthy();
    expect(getByText('Before 6AM')).toBeTruthy();
    expect(getByText('Aircraft Model')).toBeTruthy();
    expect(getByText('Airline')).toBeTruthy();
    expect(getByText('Clear Filter')).toBeTruthy();
    expect(getByText('Apply')).toBeTruthy();
  });

  it('calls applyFilter when Apply button is pressed', () => {
    const { getByText } = render(<FiltersModal {...props} />);
    const applyButton = getByText('Apply');
    fireEvent.press(applyButton);
    expect(props.applyFilter).toHaveBeenCalledTimes(1);
  });

  it('calls clearFilter when Clear Filter button is pressed', () => {
    const { getByText } = render(<FiltersModal {...props} />);
    const clearFilterButton = getByText('Clear Filter');
    fireEvent.press(clearFilterButton);
    expect(props.clearFilter).toHaveBeenCalledTimes(1);
  });
});
