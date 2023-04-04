import React from 'react';
import './style.css';

type Props = {
  message: string;
};

export const ValidationError: React.FC<Props> = (props: Props) => {
  const { message } = props;

  return (
    <span className="validationError" role="alert">
      {message}
    </span>
  );
};
