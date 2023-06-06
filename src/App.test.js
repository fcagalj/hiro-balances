import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import { fetchBalances } from './api/fetchBalances';

jest.mock('./api/fetchBalances');

describe('App component', () => {
  it('renders loading state initially', async () => {
    fetchBalances.mockResolvedValue([
      {
        name: 'ElonToken',
        balance: 1000,
        priceUSD: 1
      }
    ]);
    render(<App />);
    await waitFor(() => screen.getByText(/ElonToken/i));
    expect(screen.getByText(/ElonToken/i)).toBeInTheDocument();
  });

  it('renders token balances when fetch is successful', async () => {
    fetchBalances.mockResolvedValue([
      {
        name: 'ElonToken',
        balance: 1000,
        priceUSD: 1
      },
      {
        name: 'HiroToken',
        balance: 500,
        priceUSD: 2
      }
    ]);

    render(<App />);
    await waitFor(() => screen.getByText(/ElonToken/i));
    await waitFor(() => screen.getByText(/HiroToken/i));

    expect(screen.getByText(/ElonToken/i)).toBeInTheDocument();
    expect(screen.getByText(/HiroToken/i)).toBeInTheDocument();
  });

  //TODO: add test for error state
});
