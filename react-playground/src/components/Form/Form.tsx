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
  showSuccessMessage: boolean;
}

const INITIAL_STATE: State = {
  showSuccessMessage: false,
};

const FORM_INITIAL_STATE: Omit<FormValues, 'gender'> = {
  firstName: '',
  lastName: '',
  birthDate: '',
  agree: false,
  country: '',
  image: null,
};

export const Form: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { register, handleSubmit, formState, reset, watch } = useForm<FormValues>();
  watch(['firstName', 'lastName', 'birthDate']);
  const { errors } = formState;
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(FORM_INITIAL_STATE);
    }
  }, [formState, reset]);

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

  const onFailedSubmit = () => {
    setState({ ...state, showSuccessMessage: false });
  };

  const onSubmit = (data: FormValues) => {
    const card = data;
    const file = data.image && data.image[0];
    file &&
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
    <form className="form" onSubmit={handleSubmit(onSubmit, onFailedSubmit)} role="form">
      <UserNameInput label="Name" name="firstName" refOne={register} />
      <ErrorMessage errors={errors} name="firstName" render={renderValidation} />
      <UserNameInput label="Surname" name="lastName" refOne={register} />
      <ErrorMessage errors={errors} name="lastName" render={renderValidation} />
      <BirthDateInput refOne={register} />
      <ErrorMessage errors={errors} name="birthDate" render={renderValidation} />
      <SelectCountry refOne={register} />
      <ErrorMessage errors={errors} name="country" render={renderValidation} />
      <Gender refOne={register} />
      <ErrorMessage errors={errors} name="gender" render={renderValidation} />
      <UploadImage refOne={register} />
      <ErrorMessage errors={errors} name="image" render={renderValidation} />
      <FormAgree refOne={register} />
      <ErrorMessage errors={errors} name="agree" render={renderValidation} />
      <input className="form-btn" type="submit" role="button" value="Save" />
      <span className={getClassName()}>Your data has been saved successfully!</span>
    </form>
  );
};
