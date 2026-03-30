import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch globalment per evitar crides reals al servidor
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        games: [{ id: 1, name: 'estrella', dies: 1 }],
      }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renderitza el títol Rebuscada', async () => {
  render(<App />);
  const heading = await screen.findByText('Rebuscada');
  expect(heading).toBeInTheDocument();
});

test('renderitza el camp d\'entrada', async () => {
  render(<App />);
  const input = await screen.findByPlaceholderText(/escriviu una paraula/i);
  expect(input).toBeInTheDocument();
});
