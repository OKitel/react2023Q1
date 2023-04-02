import React from 'react';
import './style.css';
import { FormValues } from 'models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  name: 'firstName' | 'lastName';
  refOne: UseFormRegister<FormValues>;
};

export const UserNameInput: React.FC<Props> = (props: Props) => {
  const { label, name, refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor={name}>
        {label}
        <input type="text" {...refOne(name)} id={name}></input>
      </label>
    </div>
  );
};
