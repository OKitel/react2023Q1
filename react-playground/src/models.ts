export interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  gender?: 'male' | 'female';
  image: string;
}
export interface FormDataWithID extends FormData {
  id: number;
}

export type FormValues = {
  firstName: string;
  lastName: string;
  birthDate: string;
  agree: boolean;
  country: string;
  gender: 'male' | 'female';
  image: FileList | null;
};
