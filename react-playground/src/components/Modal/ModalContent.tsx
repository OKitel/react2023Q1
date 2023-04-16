import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faCalendar,
  faBook,
  faUser,
  faLocationPin,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../Loader/Loader';
import { Toast } from '../Toast/Toast';
import './style.css';
import { useGetOnePhotoQuery } from '../../redux/api';

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageId: string;
};

type ModalData = {
  alt: string;
  description: string;
  imgSrc: string;
  downloadLink: string;
  userName: string;
  userBio: string;
  userLocation: string;
  created: string;
  likes: number;
  views: number;
  width: number;
  height: number;
};

export const ModalContent: React.FC<Props> = ({ setModalOpen, imageId }) => {
  const [rejected, setRejected] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<ModalData>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showToast, setShowToast] = useState<boolean>(false);

  const { data, isFetching, error } = useGetOnePhotoQuery(imageId);

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        if (error.status !== 200) {
          setErrorMessage('HTTP response: ' + error.status);
        } else {
          setErrorMessage('');
        }
      }
      setRejected(true);
      setShowToast(true);
    } else {
      setRejected(false);
      setShowToast(false);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const date = new Date(data.created_at);
      const convertedDate = date.toDateString();

      const photo: ModalData = {
        alt: data.alt_description,
        description: data.description,
        imgSrc: data.urls.regular,
        downloadLink: data.links.download,
        userName: data.user.name,
        userBio: data.user.bio,
        userLocation: data.user.location,
        created: convertedDate,
        likes: data.likes,
        views: data.views,
        width: data.width,
        height: data.height,
      };
      setModalPhoto(photo);
    }
  }, [data]);

  const onToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="content-wrapper">
      {isFetching && <Loader />}
      <Toast message={errorMessage} show={showToast} onClose={onToastClose} />
      {!isFetching && !rejected && (
        <>
          <div className="image-container">
            <img className="modal__image" src={modalPhoto?.imgSrc} alt={modalPhoto?.alt} />
          </div>

          <div className="modal-container">
            <ul className="modal__info">
              {modalPhoto?.userName && (
                <li>
                  <h3>Photographer: {modalPhoto?.userName}</h3>
                </li>
              )}
              {modalPhoto?.userBio && (
                <li>
                  <FontAwesomeIcon className="modal__icon" icon={faUser} /> {modalPhoto.userBio}
                </li>
              )}
              {modalPhoto?.userLocation && (
                <li>
                  <FontAwesomeIcon className="modal__icon" icon={faLocationPin} />
                  {modalPhoto.userLocation}
                </li>
              )}
              {modalPhoto?.description && (
                <li>
                  <FontAwesomeIcon className="modal__icon" icon={faBook} /> {modalPhoto.description}
                </li>
              )}
              {modalPhoto?.created && (
                <li>
                  <FontAwesomeIcon className="modal__icon" icon={faCalendar} /> {modalPhoto.created}
                </li>
              )}
              {modalPhoto?.likes && (
                <li>
                  <FontAwesomeIcon className="modal__icon" icon={faHeart} /> {modalPhoto.likes}
                </li>
              )}
              {modalPhoto?.views && (
                <li>
                  <FontAwesomeIcon className="modal__icon" icon={faEye} /> {modalPhoto.views}
                </li>
              )}
            </ul>
            {modalPhoto?.downloadLink && (
              <a
                className="modal__info-btn buttons"
                href={modalPhoto.downloadLink}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  Download {modalPhoto.width}x{modalPhoto.height}
                </span>
              </a>
            )}
          </div>
        </>
      )}

      <button className="modal__btn buttons" type="button" onClick={() => setModalOpen(false)}>
        <span>X</span>
      </button>
    </div>
  );
};
