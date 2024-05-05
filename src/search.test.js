import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './components/search';

test('handles search input change', () => {
    const onSearchChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<Search onSearchChange={onSearchChangeMock} />);
    const searchInput = getByPlaceholderText('Search for movies');

    fireEvent.change(searchInput, { target: { value: 'Avengers' } });

    expect(onSearchChangeMock).toHaveBeenCalledWith('Avengers');
});