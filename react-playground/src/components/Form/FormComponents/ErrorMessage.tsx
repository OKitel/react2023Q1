import React from 'react';
import './style.css';

type Props = {
  message: string | undefined;
};

export const ErrorMessage: React.FC<Props> = (props: Props) => {
  const { message } = props;

  return <span className="validationError">{message}</span>;
};
