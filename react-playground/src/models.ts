export interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  gender: 'male' | 'female';
}
export interface FormDataWithID extends FormData {
  id: number;
}
