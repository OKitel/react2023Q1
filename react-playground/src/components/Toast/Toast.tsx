import React from 'react';
import './style.css';

type Props = {
  message: string | undefined;
  show: boolean;
  onClose: () => void;
};

export const Toast: React.FC<Props> = (props: Props) => {
  return (
    <div className={`toast ${props.show ? 'show' : ''}`}>
      <div className="toast-header">
        <h3>Sorry, something went wrong...</h3>
        <div className="btn-container">
          <button type="button" className="btn-close" onClick={props.onClose}>
            X
          </button>
        </div>
      </div>
      <div className="toast-body">
        <p>{props.message}</p>
      </div>
    </div>
  );
};
