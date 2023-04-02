import React from 'react';
import './style.css';

type Props = {
  refOne: React.Ref<HTMLInputElement>;
};

export const FormAgree: React.FC<Props> = (props: Props) => {
  const { refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor="agree" className="agreeLabel">
        I agree to the processing of personal data
        <input className="hiddenCheckbox" type="checkbox" id="agree" ref={refOne}></input>
        <span className="styledCheckbox"></span>
      </label>
    </div>
  );
};
