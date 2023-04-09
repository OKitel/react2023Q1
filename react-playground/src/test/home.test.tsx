import { describe, test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '../components/pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import { resList } from '../mocks/res';

describe('Home test', () => {
  test('Should show search bar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Type here.../i)).toBeDefined();
  });

  test('should render cardsField with correct number of cards', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    resList.results.forEach((card) => {
      expect(screen.getByText(card.likes)).toBeDefined();
    });

    expect(screen.getAllByRole('img')).toHaveLength(10);
  });
});
