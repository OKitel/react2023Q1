import React from 'react';
import './style.css';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export class UserNameInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { label, name, value, onChange } = this.props;

    return (
      <div className="formControl">
        <label htmlFor={name}>
          {label}
          <input
            type="text"
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
