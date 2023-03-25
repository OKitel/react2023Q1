import React from 'react';
import './style.css';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export class FormAgree extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <div className="formControl">
        <label htmlFor="agree">
          I agree to the processing of personal data
          <input
            type="checkbox"
            name="agree"
            checked={value}
            onChange={(): void => {
              onChange(!value);
            }}
          ></input>
        </label>
      </div>
    );
  }
}
