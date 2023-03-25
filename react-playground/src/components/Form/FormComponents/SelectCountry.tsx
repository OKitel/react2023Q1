import React from 'react';
import './style.css';

type Props = {
  label?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
};

export class SelectCountry extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { label = 'Select country', name = 'country', value, onChange } = this.props;

    return (
      <div className="formControl">
        <label htmlFor="country">
          {label} &nbsp;
          <select
            name={name}
            value={value}
            onChange={(event): void => {
              onChange(event.target.value);
            }}
          >
            <option value="Belarus">Belarus</option>
            <option value="Poland">Poland</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Ukraine">Ukraine</option>
          </select>
        </label>
      </div>
    );
  }
}
