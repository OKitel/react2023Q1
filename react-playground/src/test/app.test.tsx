import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';
import { MemoryRouter } from 'react-router-dom';
describe('App test', () => {
  test('Should render home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home Page/i)).toBeDefined();

    expect(screen.getByText(/Wolf/i)).toBeDefined();
  });

  test('Should render about us page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/About/i)).toBeDefined();
  });

  test('Should render not found page', () => {
    render(
      <MemoryRouter initialEntries={['/sdljfalsdkj']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeDefined();
  });
});
