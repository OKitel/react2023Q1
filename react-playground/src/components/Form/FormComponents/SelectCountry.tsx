import React from 'react';
import './style.css';
import { FormValues } from 'models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  label?: string;
  name?: 'country';
  refOne: UseFormRegister<FormValues>;
};

export const SelectCountry: React.FC<Props> = (props: Props) => {
  const { label = 'Select country', name = 'country', refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor="country">
        {label} &nbsp;
        <select className="selectCountry" {...refOne(name)} id="country">
          <option hidden>--select an option--</option>
          <option value="Belarus">Belarus</option>
          <option value="Poland">Poland</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Ukraine">Ukraine</option>
        </select>
      </label>
    </div>
  );
};
