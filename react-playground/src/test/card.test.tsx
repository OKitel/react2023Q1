import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card/Card';

describe('Card test', () => {
  test('Should show card title', () => {
    render(<Card key="1" imgSrc="#" likes={1113} alt="some text here" onClick={() => {}} />);

    expect(screen.getByText('1113')).toBeDefined();
  });
});
