import React from 'react';
import { Form } from '../../Form/Form';
import { FormCard } from '../../FormCard/FormCard';
import { FormData, FormDataWithID } from '../../../redux/form/models';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addSubmission } from '../../../redux/form/reducers';
import './style.css';

export const FormPage: React.FC = () => {
  const { submissions } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const handleSubmit = (card: FormData): void => {
    dispatch(
      addSubmission({
        submission: card,
      })
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <div className="formCardsField">
        {submissions.map((card: FormDataWithID) => (
          <FormCard key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};
