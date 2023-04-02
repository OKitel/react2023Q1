import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormData, FormValues } from '../../models';
import { UserNameInput } from './FormComponents/UserNameInput';
import { BirthDateInput } from './FormComponents/BirthDateInput';
import { SelectCountry } from './FormComponents/SelectCountry';
import { Gender } from './FormComponents/Gender';
import { FormAgree } from './FormComponents/FormAgree';
import { UploadImage } from './FormComponents/UploadImage';
import { ValidationError } from './FormComponents/ValidationError';
import './style.css';

type Props = {
  onSubmit: (card: FormData) => void;
};

interface State {
  errors: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    agree?: string;
    country?: string;
    gender?: string;
    image?: string;
  };
  showSuccessMessage: boolean;
}

const INITIAL_STATE: State = {
  errors: {
    firstName: '',
    lastName: '',
    birthDate: '',
    agree: '',
    country: '',
    gender: '',
    image: '',
  },
  showSuccessMessage: false,
};

export const Form: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { register, handleSubmit, formState, reset, watch } = useForm<FormValues>();
  watch('firstName');
  watch('lastName');
  watch('birthDate');
  const { errors } = formState;
  console.log(errors);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);
  // const validateForm = (
  //   card: Omit<FormData, 'image'>,
  //   files: FileList | null
  // ): files is FileList => {
  //   const { firstName, lastName, birthDate, country, gender } = card;
  //   const agree = formAgree.current?.checked;
  //   const image = files?.length;
  //   setState({ ...state, errors: {} });
  //   const error: State['errors'] = {
  //     agree: undefined,
  //     firstName: undefined,
  //     lastName: undefined,
  //     birthDate: undefined,
  //     country: undefined,
  //     gender: undefined,
  //     image: undefined,
  //   };

  //   if (!agree) {
  //     error.agree = 'Agree with privacy policy';
  //   }
  //   if (firstName.length === ZERO) {
  //     error.firstName = 'Name is required';
  //   } else if (firstName[0].toLowerCase() === firstName[0]) {
  //     error.firstName = 'Name should start with an uppercase letter';
  //   }
  //   if (lastName.length === ZERO) {
  //     error.lastName = 'Surname is required';
  //   } else if (lastName[0].toLowerCase() === lastName[0]) {
  //     error.lastName = 'Surname should start with an uppercase letter';
  //   }
  //   if (new Date(birthDate) > new Date()) {
  //     error.birthDate = 'Welcome back time traveler :)';
  //   } else if (birthDate.length === ZERO) {
  //     error.birthDate = 'Birth date is required';
  //   }
  //   if (!gender || gender.length === ZERO) {
  //     error.gender = 'Gender is required';
  //   }
  //   if (!country || country === '--select an option--') {
  //     error.country = 'Country is required';
  //   }
  //   if (!image) {
  //     error.image = 'Image is required';
  //   }
  //   setState({ ...state, errors: error });
  //   const values = Object.values(error);
  //   return values.every((item) => !item);
  // };

  const getClassName = (): string => {
    return state.showSuccessMessage ? 'successMessageVisible' : 'successMessageHidden';
  };

  const onFileLoad = (file: File, cb: (fileAsString: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      cb(reader.result as string);
    };
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const card = data;
    const file = data.image[0];
    onFileLoad(file, (fileAsString: string) => {
      const cardWithImage: FormData = {
        ...card,
        image: fileAsString,
      };
      props.onSubmit(cardWithImage);
      setState({ ...state, showSuccessMessage: true });
    });
  };

  const renderValidation = ({ message }: { message: string }) => (
    <ValidationError message={message} />
  );

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} role="form">
      <UserNameInput label="Name" name="firstName" refOne={register} />
      <ErrorMessage errors={errors} name="firstName" render={renderValidation} />
      <UserNameInput label="Surname" name="lastName" refOne={register} />
      <ErrorMessage errors={errors} name="lastName" render={renderValidation} />
      <BirthDateInput refOne={register} />
      <ErrorMessage errors={errors} name="birthDate" render={renderValidation} />
      <SelectCountry refOne={register} />
      {/* <ErrorMessage message={errors.country} /> */}
      <Gender refOne={register} refTwo={register} />
      {/* <ErrorMessage message={errors.gender} /> */}
      <UploadImage refOne={register} />
      {/* <ErrorMessage message={errors.image} /> */}
      <FormAgree refOne={register} />
      {/* <ErrorMessage message={errors.agree} /> */}
      <input className="form-btn" type="submit" role="button" value="Save" />
      <span className={getClassName()}>Your data has been saved successfully!</span>
    </form>
  );
};
