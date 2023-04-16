import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../SearchBar/SearchBar';
import { Card } from '../../Card/Card';
import { Modal } from '../../Modal/Modal';
import { ModalContent } from '../../Modal/ModalContent';
import { PhotoDTO } from '../../../redux/models';
import { Loader } from '../../Loader/Loader';
import { Toast } from '../../Toast/Toast';
import { useGetPhotoListQuery } from '../../../redux/api';
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
  const [lastSuccessfulQuery, setLastSuccessfulQuery] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [finalSearchQuery, setFinalSearchQuery] = useState<string>('');

  const savedValue = localStorage.getItem('searchValue');
  const initialValue = savedValue ? JSON.parse(savedValue) : '';

  useEffect(() => {
    onSubmit(initialValue);
  }, [initialValue]);

  const { data, isFetching, error } = useGetPhotoListQuery({ query: finalSearchQuery });
  console.log(error);

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        if (error.status === 401) {
          setErrorMessage(
            'Dear RSS Reviewer! Please, set your access key in the .env file. Find all instructions in the PR or README file.'
          );
        } else {
          setErrorMessage('HTTP response: ' + error.status);
        }
        if (error.status !== 200) {
          setRejected(true);
          setShowToast(true);
        }
      }
    } else {
      setErrorMessage('');
    }

    if (!error) {
      setLastSuccessfulQuery(finalSearchQuery);
      setRejected(false);
    }
  }, [error, finalSearchQuery]);

  useEffect(() => {
    if (data) {
      const cards: CardData[] = data.results.map((item: PhotoDTO): CardData => {
        return {
          id: item.id,
          imgSrc: item.urls.small,
          alt: item.alt_description,
          likes: item.likes,
        };
      });
      setCardsData(cards);
    }
  }, [data]);

  const onClick = async (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const onSubmit = async (value: string) => {
    setFinalSearchQuery(value);
    localStorage.setItem('searchValue', JSON.stringify(value));
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
          Found {data?.total} results for &quot;{lastSuccessfulQuery}&quot;
        </h3>
      )}
      <Toast message={errorMessage} show={showToast} onClose={onToastClose} />
      {isFetching && <Loader />}
      {!rejected && <div className="cardsField">{cards}</div>}
      <Modal modalOpen={modalOpen}>
        <ModalContent setModalOpen={setModalOpen} imageId={selectedId} />
      </Modal>
    </>
  );
};
