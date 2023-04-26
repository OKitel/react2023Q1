import React from 'react';
import { FormData } from 'redux/form';
import './style.css';

type Props = {
  card: FormData;
};

export const FormCard: React.FC<Props> = (props: Props) => {
  const { firstName, lastName, birthDate, country, gender, image } = props.card;
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
};
