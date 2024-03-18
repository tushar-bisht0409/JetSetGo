import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ResultScreen from '../../src/screens/ResultScreen';

describe('ResultScreen', () => {
  it('renders correctly with loading spinner when isLoading is true', () => {
    const { getByTestId } = render(<ResultScreen />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders error message and try again button when isError is true', () => {
    const { getByText, getByTestId } = render(<ResultScreen />);
    expect(getByText('An Error Occured!')).toBeTruthy();
    const tryAgainButton = getByTestId('try-again-button');
    fireEvent.press(tryAgainButton);
  });

  it('renders flight data when isLoading is false and isError is false', () => {
    const { queryByTestId } = render(<ResultScreen />);
    expect(queryByTestId('loading-spinner')).toBeFalsy();
    expect(queryByTestId('error-message')).toBeFalsy();
  });

  it('opens filters modal when filter button is pressed', () => {
    const { getByText, getByTestId } = render(<ResultScreen />);
    fireEvent.press(getByText('Filter'));
    expect(getByTestId('filters-modal')).toBeTruthy();
  });

  it('opens sort by modal when sort by button is pressed', () => {
    const { getByText, getByTestId } = render(<ResultScreen />);
    fireEvent.press(getByText('Sort By'));
    expect(getByTestId('sort-by-modal')).toBeTruthy();
  });
});
