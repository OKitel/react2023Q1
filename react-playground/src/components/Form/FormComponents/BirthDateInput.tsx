import React from 'react';
import './style.css';

type Props = {
  label?: string;
  name?: string;
  refOne: React.Ref<HTMLInputElement>;
};

export class BirthDateInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { label = 'Birth date', name = 'birthDate', refOne } = this.props;
    return (
      <div className="formControl">
        <label htmlFor="birthDate">
          {label}
          <input type="date" name={name} ref={refOne}></input>
        </label>
      </div>
    );
  }
}
