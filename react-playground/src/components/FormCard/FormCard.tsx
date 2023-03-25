import React from 'react';
import { FormData } from '../../models';

type Props = {
  card: FormData;
};

export class FormCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { firstName, lastName, birthDate, country, gender } = this.props.card;
    return (
      <>
        <div
          className="cardContainer"
          style={{
            background: gender === 'male' ? 'rgb(178, 214, 245)' : 'rgb(245 178 225)',
          }}
        >
          <p>Name: {firstName}</p>
          <p>Surname: {lastName}</p>
          <p>Birthdate: {birthDate}</p>
          <p>Country: {country}</p>
          <p>Gender: {gender}</p>
        </div>
      </>
    );
  }
}
