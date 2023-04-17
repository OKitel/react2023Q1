import { describe, test, expect } from 'vitest';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { App } from '../App';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';

describe('App test', () => {
  test('Should render home page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home Page/i)).toBeDefined();

    expect(screen.getByRole('loader')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    expect(screen.getByText('1113')).toBeDefined();
  });

  test('Should render about us page', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/About/i)).toBeDefined();
  });

  test('Should render not found page', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/sdljfalsdkj']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/404/i)).toBeDefined();
  });
});
