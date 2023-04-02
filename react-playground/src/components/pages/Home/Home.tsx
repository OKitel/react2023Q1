import { SearchBar } from '../../SearchBar/SearchBar';
import React, { useState } from 'react';
import './style.css';
import { Card } from '../../Card/Card';
import { cardsData } from './cardsDB';

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

export const Home: React.FC = () => {
  const [state] = useState<State>({ cardsData });

  const cards = state.cardsData.map((item) => {
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
      <SearchBar />
      <div className="cardsField">{cards}</div>
    </>
  );
};
