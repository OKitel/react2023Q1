import React from 'react';
import './style.css';

type Props = {
  refOne: React.Ref<HTMLInputElement>;
  refTwo: React.Ref<HTMLInputElement>;
};

export class Gender extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { refOne, refTwo } = this.props;

    return (
      <div className="formControl">
        <div className="switch-field">
          <input type="radio" id="radio-one" name="switch-one" value="male" ref={refOne} />
          <label htmlFor="radio-one">Male</label>
          <input type="radio" id="radio-two" name="switch-one" value="female" ref={refTwo} />
          <label htmlFor="radio-two">Female</label>
        </div>
      </div>
    );
  }
}
