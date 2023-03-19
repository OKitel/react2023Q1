import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../components/Home/Home';

describe('Home test', () => {
  test('Should show search bar', () => {
    render(<Home />);

    expect(screen.getByPlaceholderText(/Type here.../i)).toBeDefined();
  });

  test('renders cardsField with correct number of cards', () => {
    const { container } = render(<Home />);
    const cardsField = container.querySelector('.cardsField');
    expect(cardsField).toBeDefined();
    if (cardsField) {
      const cards = cardsField.querySelectorAll('.cardContainer');
      expect(cards.length).toEqual(8);
    }
  });
});
