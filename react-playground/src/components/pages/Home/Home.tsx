import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../SearchBar/SearchBar';
import { Card } from '../../Card/Card';
import { Modal } from '../../Modal/Modal';
import { ModalContent } from '../../Modal/ModalContent';
import { getPhotoList } from '../../../api/unsplash.photos';
import { ApiResponse, PhotoDTO } from '../../../api/models';
import { Loader } from '../../Loader/Loader';
import { Toast } from '../../Toast/Toast';
import './style.css';

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
  const [isLoading, setIsLoading] = useState(true);
  const [lastSuccessfulQuery, setLastSuccessfulQuery] = useState<string | undefined>();
  const [totalResults, setTotalResults] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showToast, setShowToast] = useState<boolean>(false);

  const savedValue = localStorage.getItem('searchValue');
  const initialValue = savedValue ? JSON.parse(savedValue) : '';

  useEffect(() => {
    onSubmit(initialValue);
  }, [initialValue]);

  const onClick = async (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const onSubmit = async (value: string) => {
    setIsLoading(true);
    try {
      localStorage.setItem('searchValue', JSON.stringify(value));
      const data: ApiResponse | undefined = await getPhotoList(value);
      if (data && data.status !== 200) {
        if (data.status === 401) {
          setErrorMessage(
            'Dear RSS Reviewer! Please, set your access key in the .env file. Find all instructions in the PR or README file.'
          );
        } else {
          setErrorMessage('HTTP response: ' + data.statusText);
        }
      } else {
        setErrorMessage('');
      }

      if (!data || data.status !== 200) {
        setRejected(true);
        setShowToast(true);
        return;
      }

      setLastSuccessfulQuery(value);
      setTotalResults(data.total);

      const cards: CardData[] = data.results.map((item: PhotoDTO): CardData => {
        return {
          id: item.id,
          imgSrc: item.urls.small,
          alt: item.alt_description,
          likes: item.likes,
        };
      });
      setCardsData(cards);
      setRejected(false);
    } finally {
      setIsLoading(false);
    }
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

  const onToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {lastSuccessfulQuery && !rejected && (
        <h3>
          Found {totalResults} results for &quot;{lastSuccessfulQuery}&quot;
        </h3>
      )}
      <Toast message={errorMessage} show={showToast} onClose={onToastClose} />
      {isLoading && <Loader />}
      {!rejected && <div className="cardsField">{cards}</div>}
      <Modal modalOpen={modalOpen}>
        <ModalContent setModalOpen={setModalOpen} imageId={selectedId} />
      </Modal>
    </>
  );
};
