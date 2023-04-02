import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card/Card';

describe('Card test', () => {
  test('Should show card title', () => {
    render(<Card key="1" imgSrc="#" title="Test title" views={13} likes={13} shares={1} />);

    expect(screen.getByText(/Test title/i)).toBeDefined();
  });
});
