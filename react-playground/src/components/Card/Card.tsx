import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faEye } from '@fortawesome/free-solid-svg-icons';
import './style.css';

type Props = {
  imgSrc: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
};

export const Card: React.FC<Props> = (props: Props) => {
  return (
    <div className="cardContainer">
      <img className="cardImg" src={props.imgSrc} alt={props.title} />
      <h2 className="cardTitle">&nbsp;{props.title}&nbsp;</h2>
      <div className="cardFooter">
        <div className="cardFooterElement">
          <FontAwesomeIcon className="cardIcon" icon={faEye} />
          <span className="cardNumbers">{props.views}</span>
        </div>
        <div className="cardFooterElement">
          <FontAwesomeIcon className="cardIcon" icon={faHeart} />
          <span className="cardNumbers">{props.likes}</span>
        </div>
        <div className="cardFooterElement">
          <FontAwesomeIcon className="cardIcon" icon={faShare} />
          <span className="cardNumbers">{props.shares}</span>
        </div>
      </div>
    </div>
  );
};
