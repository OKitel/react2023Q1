import React from 'react';
import './style.css';

type Props = {
  refOne: React.RefObject<HTMLInputElement>;
};

export const UploadImage: React.FC<Props> = (props: Props) => {
  const { refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor="imgUpload" className="fileLabel">
        Upload image
        <input id="imgUpload" type="file" accept="image/png, image/gif, image/jpeg" ref={refOne} />
      </label>
    </div>
  );
};
