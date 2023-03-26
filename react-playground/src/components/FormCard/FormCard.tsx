import React from 'react';
import { FormData } from '../../models';
import './style.css';

type Props = {
  card: FormData;
};

export class FormCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { firstName, lastName, birthDate, country, gender, image } = this.props.card;
    return (
      <>
        <div className="formCardContainer">
          <div className="formCardImgContainer">
            <img className="formCardImg" src={image} alt={image} />
          </div>
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
