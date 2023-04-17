import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FormPage } from '../components/pages/FormPage/FormPage';
import { FormCard } from '../components/FormCard/FormCard';
import { FormData } from '../redux/form/models';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Form page test', () => {
  test('Should show form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <FormPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Surname')).toBeDefined();
    expect(screen.getByText('Select country')).toBeDefined();
    expect(screen.getByText('Choose your gender')).toBeDefined();
    expect(screen.getByText('Upload image')).toBeDefined();
    expect(screen.getByText('I agree to the processing of personal data')).toBeDefined();
  });

  test('Should check validation', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <FormPage />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    expect(screen.getByText(/^Name is required/i)).toBeDefined();
    expect(screen.getByText(/Surname is required/i)).toBeDefined();
    expect(screen.getByText(/Birth date is required/i)).toBeDefined();
    expect(screen.getByText(/Country is required/i)).toBeDefined();
    expect(screen.getByText(/Gender is required/i)).toBeDefined();
    expect(screen.getByText(/Image is required/i)).toBeDefined();
    expect(screen.getByText(/Agree with privacy policy/i)).toBeDefined();
  });

  test('Should show form card', () => {
    const cardInfo: FormData = {
      firstName: 'John',
      lastName: 'Smith',
      birthDate: '1987-03-14',
      country: 'Poland',
      gender: 'male',
      image: 'some image',
    };
    render(<FormCard card={cardInfo} />);

    expect(screen.getByText(/John/i)).toBeDefined();
  });

  test('Should upload file', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <FormPage />
        </MemoryRouter>
      </Provider>
    );

    const file = new File(['(⌐□_□)'], 'test-image.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Upload image') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files && fileInput.files[0].name).toBe('test-image.png');
  });
});
