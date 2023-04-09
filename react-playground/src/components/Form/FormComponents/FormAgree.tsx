import React from 'react';
import './style.css';
import { FormValues } from '../../../shared/models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  refOne: UseFormRegister<FormValues>;
};

export const FormAgree: React.FC<Props> = (props: Props) => {
  const { refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor="agree" className="agreeLabel">
        I agree to the processing of personal data
        <input
          className="hiddenCheckbox"
          type="checkbox"
          id="agree"
          {...refOne('agree', { required: 'Agree with privacy policy' })}
        ></input>
        <span className="styledCheckbox"></span>
      </label>
    </div>
  );
};
