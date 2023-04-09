import React from 'react';
import './style.css';
import { FormValues } from '../../../shared/models';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  refOne: UseFormRegister<FormValues>;
};

export const UploadImage: React.FC<Props> = (props: Props) => {
  const { refOne } = props;

  return (
    <div className="formControl">
      <label htmlFor="imgUpload" className="fileLabel">
        Upload image
        <input
          id="imgUpload"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          {...refOne('image', { required: 'Image is required' })}
        />
      </label>
    </div>
  );
};
