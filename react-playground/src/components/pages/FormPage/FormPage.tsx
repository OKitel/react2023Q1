import React, { useState } from 'react';
import { Form } from '../../Form/Form';
import { FormCard } from '../../FormCard/FormCard';
import { FormData, FormDataWithID } from '../../../shared/models';
import './style.css';

const DEFAULT_ID = 0;
const INCREMENT_ID = 1;
let id = DEFAULT_ID;

type State = {
  cards: Array<FormDataWithID>;
};

export const FormPage: React.FC = () => {
  const [state, setState] = useState<State>({ cards: [] });

  const handleSubmit = (card: FormData): void => {
    const { firstName, lastName, birthDate, country, gender, image } = card;
    setState({
      cards: [
        ...state.cards,
        {
          firstName,
          lastName,
          birthDate,
          country,
          gender,
          image,
          id,
        },
      ],
    });
    id += INCREMENT_ID;
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <div className="formCardsField">
        {state.cards.map((card: FormDataWithID) => (
          <FormCard key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};
