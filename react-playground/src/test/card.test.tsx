import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Card } from '../components/Card/Card';
import { renderWithProviders } from './test-utils';

describe('Card test', () => {
  test('Should show card title', () => {
    renderWithProviders(
      <Card key="1" imgSrc="#" likes={1113} alt="some text here" onClick={() => {}} />
    );

    expect(screen.getByText('1113')).toBeDefined();
  });
});
