import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faCalendar,
  faBook,
  faUser,
  faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import { getOnePhoto } from '../../api/unsplash.photos';
import { FullPhotoDTO } from '../../api/models';
import { Loader } from '../Loader/Loader';
import { Toast } from '../Toast/Toast';
import './style.css';

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageId: string | undefined;
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
  views: number;
  width: number;
  height: number;
};

export const ModalContent: React.FC<Props> = ({ setModalOpen, imageId }) => {
  const [rejected, setRejected] = useState(false);
  const [modalPhoto, setModalPhoto] = useState<ModalData>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showToast, setShowToast] = useState<boolean>(false);

  const getPhoto = async (id: string | undefined) => {
    const res: FullPhotoDTO | undefined = await getOnePhoto(id);

    if (res && res.status !== 200) {
      setErrorMessage('HTTP response: ' + res.statusText);
    } else {
      setErrorMessage('');
    }

    if (!res || res.status !== 200) {
      setIsLoading(false);
      setRejected(true);
      setShowToast(true);
      return;
    }

    const date = new Date(res.created_at);
    const convertedDate = date.toDateString();

    const photo: ModalData = {
      alt: res.alt_description,
      description: res.description,
      imgSrc: res.urls.regular,
      downloadLink: res.links.download,
      userName: res.user.name,
      userBio: res.user.bio,
      userLocation: res.user.location,
      created: convertedDate,
      views: res.views,
      width: res.width,
      height: res.height,
    };
    setModalPhoto(photo);
    setIsLoading(false);
  };

  useEffect(() => {
    getPhoto(imageId);
  }, [imageId]);

  const onToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className="content-wrapper">
      {isLoading && <Loader />}
      <Toast message={errorMessage} show={showToast} onClose={onToastClose} />
      {!isLoading && !rejected && (
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
