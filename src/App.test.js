import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App, { fetchBalances } from './App';

jest.mock('./App', () => ({
  fetchBalances: jest.fn(),
}));

describe('App component', () => {
  it('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders token balances when fetch is successful', async () => {
    const mockBalances = [
      { name: 'Bitcoin', balance: 0.2, priceUSD: 27300 },
      { name: 'ElonToken', balance: 19.99, priceUSD: 0.01 },
    ];
    fetchBalances.mockResolvedValue(mockBalances);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/)).toBeInTheDocument();
      expect(screen.getByText(/ElonToken/)).toBeInTheDocument();
    });
  });

  it('renders error message when fetch fails', async () => {
    fetchBalances.mockRejectedValue(new Error('API Error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
