import React from 'react';
import './style.css';

type Props = {
  message: string | undefined;
};

export class ErrorMessage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { message } = this.props;

    return <span className="validationError">{message}</span>;
  }
}
