import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './style.css';

type Props = {
  imgSrc: string;
  likes: number;
  alt: string;
  onClick: () => void;
};

export const Card: React.FC<Props> = (props: Props) => {
  return (
    <div className="cardContainer" onClick={props.onClick}>
      <img className="cardImg" src={props.imgSrc} alt={props.alt} />
      <div className="cardFooter">
        <div className="cardFooterElement">
          <FontAwesomeIcon className="cardIcon" icon={faHeart} />
          <span className="cardNumbers">{props.likes}</span>
        </div>
      </div>
    </div>
  );
};
