import React from 'react';
import './style.css';

type Props = {
  label?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
};

export class BirthDateInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { label = 'Birth date', name = 'birthDate', value, onChange } = this.props;
    return (
      <div className="formControl">
        <label htmlFor="birthDate">
          {label}
          <input
            type="date"
            name={name}
            value={value}
            onChange={(event): void => {
              onChange(event.target.value);
            }}
          ></input>
        </label>
      </div>
    );
  }
}
