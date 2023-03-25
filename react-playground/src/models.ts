export interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  gender: string;
}
export interface FormDataWithID extends FormData {
  id: number;
}
