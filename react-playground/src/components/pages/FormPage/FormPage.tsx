import React from 'react';
import { Form } from '../../Form/Form';
import { FormCard } from '../../FormCard/FormCard';
import { FormData, FormDataWithID } from '../../../models';
import './style.css';

const DEFAULT_ID = 0;
const INCREMENT_ID = 1;
let id = DEFAULT_ID;

type State = {
  cards: Array<FormDataWithID>;
};

export class FormPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cards: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(card: FormData): void {
    const { firstName, lastName, birthDate, country, gender, image } = card;
    this.setState({
      cards: [
        ...this.state.cards,
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
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit} />
        <div className="formCardsField">
          {this.state.cards.map((card: FormDataWithID) => (
            <FormCard key={card.id} card={card} />
          ))}
        </div>
      </>
    );
  }
}
