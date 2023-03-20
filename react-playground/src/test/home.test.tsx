import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../components/pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home test', () => {
  test('Should show search bar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Type here.../i)).toBeDefined();
  });

  test('should render cardsField with correct number of cards', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );
    const cardsField = container.querySelector('.cardsField');

    expect(cardsField).toBeDefined();

    expect(screen.getAllByRole('img')).toHaveLength(8);
  });
});
