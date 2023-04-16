import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../SearchBar/SearchBar';
import { Card } from '../../Card/Card';
import { Modal } from '../../Modal/Modal';
import { ModalContent } from '../../Modal/ModalContent';
import { Loader } from '../../Loader/Loader';
import { Toast } from '../../Toast/Toast';
import { useGetPhotoListQuery } from '../../../redux/api';
import { useAppSelector } from '../../../redux/hooks';
import './style.css';

export const Home: React.FC = () => {
  const [rejected, setRejected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [lastSuccessfulQuery, setLastSuccessfulQuery] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showToast, setShowToast] = useState<boolean>(false);

  const { query } = useAppSelector((state) => state.home);

  const { data, isFetching, error } = useGetPhotoListQuery({ query: query });

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
      setLastSuccessfulQuery(query);
      setRejected(false);
    }
  }, [error, query]);

  const onClick = async (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const cards = data?.cards.map((item) => {
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
      <SearchBar />
      {lastSuccessfulQuery && !rejected && (
        <h3>
          Found {isFetching ? '***' : data?.total} results for &quot;
          {isFetching ? query : lastSuccessfulQuery}&quot;
        </h3>
      )}
      <Toast message={errorMessage} show={showToast} onClose={onToastClose} />
      {isFetching && <Loader />}
      {!rejected && <div className="cardsField">{cards}</div>}
      {selectedId && (
        <Modal modalOpen={modalOpen}>
          <ModalContent setModalOpen={setModalOpen} imageId={selectedId} />
        </Modal>
      )}
    </>
  );
};
