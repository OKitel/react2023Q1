import React, { useState } from 'react';
import { SearchBar } from '../../SearchBar/SearchBar';
import './style.css';
import { Card } from '../../Card/Card';
import { Modal } from '../../Modal/Modal';
import { ModalContent } from '../../Modal/ModalContent';
import { getPhotoList } from '../../../api/unsplash.photos';
import { ApiResponse, PhotoDTO } from '../../../api/models';

type CardData = {
  id: string;
  imgSrc: string;
  likes: number;
  alt: string;
};

export const Home: React.FC = () => {
  const [cardsData, setCardsData] = useState<Array<CardData>>([]);
  const [rejected, setRejected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const onClick = async (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

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
    return (
      <Card
        key={card.id}
        imgSrc={card.imgSrc}
        likes={card.likes}
        alt={card.alt}
        onClick={() => onClick(card.id)}
      />
    );
  });

  return rejected ? (
    <h3>Sorry, something went wrong...</h3>
  ) : (
    <>
      <SearchBar onSubmit={onSubmit} />
      <div className="cardsField">{cards}</div>
      <Modal modalOpen={modalOpen}>
        <ModalContent setModalOpen={setModalOpen} imageId={selectedId} />
      </Modal>
    </>
  );
};
