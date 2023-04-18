import { describe, test, expect } from 'vitest';
import { screen, waitForElementToBeRemoved, fireEvent, act } from '@testing-library/react';
import { Home } from '../components/pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import { resList } from '../mocks/res';
import { renderWithProviders } from './test-utils';
import userEvent from '@testing-library/user-event';

describe('Home test', () => {
  test('Should show search bar', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Type here.../i)).toBeDefined();
  });

  test('should render cardsField with correct number of cards', async () => {
    renderWithProviders(
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

  test('should search after press Enter', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Type here.../i);

    await act(() => {
      waitForElementToBeRemoved(() => screen.getByRole('loader'));
      fireEvent.change(input, { target: { value: 'cats' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(screen.getByText(/results for "cats"/i)).toBeDefined();
  });

  test('should render modal with one photo', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    const picture = screen.getByAltText(/white and black siberian husky/i);
    await userEvent.click(picture);
    await waitForElementToBeRemoved(() => screen.getByRole('loader'));
    expect(screen.getByText(/Photographer: Linda Kazares/i)).toBeDefined();
  });
});
