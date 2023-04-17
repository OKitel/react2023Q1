import { describe, test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { App } from '../App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('App test', () => {
  test('Should render home page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Home Page/i)).toBeDefined();

    expect(screen.getByRole('loader')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('loader'));

    expect(screen.getByText('1113')).toBeDefined();
  });

  test('Should render about us page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/About/i)).toBeDefined();
  });

  test('Should render not found page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/sdljfalsdkj']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/404/i)).toBeDefined();
  });
});
