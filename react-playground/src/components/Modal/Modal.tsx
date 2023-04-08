import React from 'react';
import { createPortal } from 'react-dom';
import './style.css';

type Props = {
  modalOpen: boolean;
  children: JSX.Element;
};

export const Modal: React.FC<Props> = ({ modalOpen, children }) => {
  if (!modalOpen) return null;

  return createPortal(<div className="wrapper">{children}</div>, document.body);
};
