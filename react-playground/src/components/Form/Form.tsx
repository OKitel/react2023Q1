import React from 'react';
import { FormData } from '../../models';
import './style.css';

type Props = {
  onSubmit: (card: FormData) => void;
};

export class Form extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <></>;
  }
}
