import React from 'react';
import './style.css';
import { FormValues } from 'models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  refOne: UseFormRegister<FormValues>;
};

export const Gender: React.FC<Props> = (props: Props) => {
  const { refOne } = props;

  const registerGender = refOne('gender', { required: 'Gender is required' });

  return (
    <div className="formControl">
      Choose your gender
      <div className="switch-field">
        <input type="radio" id="radio-one" value="male" {...registerGender} />
        <label htmlFor="radio-one">Male</label>
        <input type="radio" id="radio-two" value="female" {...registerGender} />
        <label htmlFor="radio-two">Female</label>
      </div>
    </div>
  );
};
