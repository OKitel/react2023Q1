import React from 'react';
import './style.css';

type Props = {
  label?: string;
  name?: string;
  refOne: React.Ref<HTMLInputElement>;
};

export const BirthDateInput: React.FC<Props> = (props: Props) => {
  const { label = 'Birth date', name = 'birthDate', refOne } = props;
  return (
    <div className="formControl">
      <label htmlFor="birthDate" className="birthDateLabel">
        {label}
        <input className="birthDate" type="date" name={name} id="birthDate" ref={refOne} />
      </label>
    </div>
  );
};
