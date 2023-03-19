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

export class Card extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="cardContainer">
        <img className="cardImg" src={this.props.imgSrc} alt={this.props.title} />
        <h2 className="cardTitle">&nbsp;{this.props.title}&nbsp;</h2>
        <div className="cardFooter">
          <div className="cardFooterElement">
            <FontAwesomeIcon className="cardIcon" icon={faEye} />
            <span className="cardNumbers">{this.props.views}</span>
          </div>
          <div className="cardFooterElement">
            <FontAwesomeIcon className="cardIcon" icon={faHeart} />
            <span className="cardNumbers">{this.props.likes}</span>
          </div>
          <div className="cardFooterElement">
            <FontAwesomeIcon className="cardIcon" icon={faShare} />
            <span className="cardNumbers">{this.props.shares}</span>
          </div>
        </div>
      </div>
    );
  }
}
