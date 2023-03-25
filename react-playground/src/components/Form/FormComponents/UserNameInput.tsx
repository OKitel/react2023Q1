import React from 'react';
import './style.css';

type Props = {
  label: string;
  name: string;
  refOne: React.Ref<HTMLInputElement>;
};

export class UserNameInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { label, name, refOne } = this.props;

    return (
      <div className="formControl">
        <label htmlFor={name}>
          {label}
          <input type="text" name={name} ref={refOne}></input>
        </label>
      </div>
    );
  }
}
