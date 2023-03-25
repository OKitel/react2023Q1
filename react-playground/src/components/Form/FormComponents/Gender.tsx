import React from 'react';
import './style.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export class Gender extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <div className="formControl">
        <div className="switch-field">
          <input
            type="radio"
            id="radio-one"
            name="switch-one"
            value="male"
            checked={value === 'male'}
            onChange={(event): void => {
              onChange(event.target.value);
            }}
          />
          <label htmlFor="radio-one">Male</label>
          <input
            type="radio"
            id="radio-two"
            name="switch-one"
            value="female"
            checked={value === 'female'}
            onChange={(event): void => {
              onChange(event.target.value);
            }}
          />
          <label htmlFor="radio-two">Female</label>
        </div>
      </div>
    );
  }
}
