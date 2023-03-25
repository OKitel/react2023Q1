import React from 'react';
import './style.css';

type Props = {
  refOne: React.Ref<HTMLInputElement>;
};

export class FormAgree extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { refOne } = this.props;

    return (
      <div className="formControl">
        <label htmlFor="agree">
          I agree to the processing of personal data
          <input type="checkbox" name="agree" ref={refOne}></input>
        </label>
      </div>
    );
  }
}
