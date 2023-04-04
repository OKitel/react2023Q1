import React from 'react';
import './style.css';
import { FormValues } from 'models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  label?: string;
  name?: 'birthDate';
  refOne: UseFormRegister<FormValues>;
};

const isDateInPast = (date: string): true | string => {
  const newDate = new Date(date);
  return newDate < new Date() || 'Welcome back time traveler :)';
};

export const BirthDateInput: React.FC<Props> = (props: Props) => {
  const { label = 'Birth date', name = 'birthDate', refOne } = props;
  return (
    <div className="formControl">
      <label htmlFor="birthDate" className="birthDateLabel">
        {label}
        <input
          className="birthDate"
          type="date"
          id="birthDate"
          {...refOne(name, {
            required: 'Birth date is required',
            validate: { isDateInPast },
          })}
        />
      </label>
    </div>
  );
};
