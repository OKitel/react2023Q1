import { describe, test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved, fireEvent, act } from '@testing-library/react';
import { Home } from '../components/pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import { resList } from '../mocks/res';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Home test', () => {
  test('Should show search bar', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Type here.../i)).toBeDefined();
  });

  test('should render cardsField with correct number of cards', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    resList.results.forEach((card) => {
      expect(screen.getByText(card.likes)).toBeDefined();
    });

    expect(screen.getAllByRole('img')).toHaveLength(10);
  });

  test('should test press Enter', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </Provider>
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
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    await fireEvent.click(screen.getByAltText(/white and black siberian husky/i));

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    expect(screen.getByText(/Photographer: Linda Kazares/i)).toBeDefined();
  });
});
