import { SearchBar } from '../../SearchBar/SearchBar';
import React from 'react';
import './style.css';
import { Card } from '../../Card/Card';
import { cardsData } from './cardsDB';
import { Header } from '../../Header/Header';

type CardData = {
  id: number;
  imgSrc: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
};
type State = {
  cardsData: Array<CardData>;
};

export class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cardsData,
    };
  }

  render() {
    const cards = this.state.cardsData.map((item) => {
      const card = item;
      return (
        <Card
          key={card.id}
          imgSrc={card.imgSrc}
          title={card.title}
          views={card.views}
          likes={card.likes}
          shares={card.shares}
        />
      );
    });
    return (
      <>
        <Header title="Home" />
        <SearchBar />
        <div className="cardsField">{cards}</div>
      </>
    );
  }
}
