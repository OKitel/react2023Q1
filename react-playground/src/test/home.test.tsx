import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../components/Home/Home';

describe('Home test', () => {
  test('Should show search bar', () => {
    render(<Home />);

    expect(screen.getByPlaceholderText(/Type here.../i)).toBeDefined();
  });
});
