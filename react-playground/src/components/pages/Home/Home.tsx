import { SearchBar } from '../../SearchBar/SearchBar';
import React, { useState } from 'react';
import './style.css';
import { Card } from '../../Card/Card';
import { getPhotoList } from '../../../api/unsplash.photos';
import { ApiResponse, PhotoDTO } from '../../../api/models';

type CardData = {
  id: string;
  imgSrc: string;
  likes: number;
  alt: string;
};

// type ModalData = {
//   alt: string;
//   description: string;
//   imgSrc: string;
//   downloadLink: string;
//   userName: string;
//   userBio: string;
//   userLocation: string;
//   created: string;
//   color: string;
//   views: number;
// };

export const Home: React.FC = () => {
  const [cardsData, setCardsData] = useState<Array<CardData>>([]);
  const [rejected, setRejected] = useState(false);

  console.log(rejected);

  const onSubmit = async (value: string) => {
    const data: ApiResponse | undefined = await getPhotoList(value);
    if (!data) {
      setRejected(true);
      return;
    }
    const cards: CardData[] = data.results.map((item: PhotoDTO): CardData => {
      return {
        id: item.id,
        imgSrc: item.urls.small,
        alt: item.alt_description,
        likes: item.likes,
      };
    });
    setCardsData(cards);
  };
  const cards = cardsData.map((item) => {
    const card = item;
    return <Card key={card.id} imgSrc={card.imgSrc} likes={card.likes} alt={card.alt} />;
  });

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <div className="cardsField">{cards}</div>
    </>
  );
};
