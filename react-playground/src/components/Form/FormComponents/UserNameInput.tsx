import React from 'react';
import './style.css';

type Props = {
  label: string;
  name: string;
  refOne: React.Ref<HTMLInputElement>;
};

export const UserNameInput: React.FC<Props> = (props: Props) => {
  const { label, name, refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor={name}>
        {label}
        <input type="text" name={name} ref={refOne} id={name}></input>
      </label>
    </div>
  );
};
