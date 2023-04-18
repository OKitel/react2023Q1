import React from 'react';
import './style.css';
import { FormValues } from '../../../redux/form/models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  name: 'firstName' | 'lastName';
  refOne: UseFormRegister<FormValues>;
};

const startsWithCapital = (name: string): true | string => {
  return name[0].toLowerCase() !== name[0] || 'Value should start with a capital letter';
};

export const UserNameInput: React.FC<Props> = (props: Props) => {
  const { label, name, refOne } = props;
  const requiredError = name === 'firstName' ? 'Name' : 'Surname';
  return (
    <div className="formControl">
      <label htmlFor={name}>
        {label}
        <input
          type="text"
          {...refOne(name, {
            required: `${requiredError} is required`,
            validate: { startsWithCapital },
          })}
          id={name}
        ></input>
      </label>
    </div>
  );
};
