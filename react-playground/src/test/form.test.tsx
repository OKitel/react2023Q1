import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormPage } from '../components/pages/FormPage/FormPage';
import { MemoryRouter } from 'react-router-dom';

describe('Form page test', () => {
  test('Should show form', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <FormPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Surname')).toBeDefined();
    expect(screen.getByText('Select country')).toBeDefined();
    expect(screen.getByText('Choose your gender')).toBeDefined();
    expect(screen.getByText('Upload image')).toBeDefined();
    expect(screen.getByText('I agree to the processing of personal data')).toBeDefined();
  });

  test('Should check validation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <FormPage />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/^Name is required/i)).toBeDefined();
    expect(screen.getByText(/Surname is required/i)).toBeDefined();
    expect(screen.getByText(/Birth date is required/i)).toBeDefined();
    expect(screen.getByText(/Country is required/i)).toBeDefined();
    expect(screen.getByText(/Gender is required/i)).toBeDefined();
    expect(screen.getByText(/Image is required/i)).toBeDefined();
    expect(screen.getByText(/Agree with privacy policy/i)).toBeDefined();
  });
});
