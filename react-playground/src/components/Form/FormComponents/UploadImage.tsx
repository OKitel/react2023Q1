import React from 'react';
import './style.css';

type Props = {
  refOne: React.RefObject<HTMLInputElement>;
};

export class UploadImage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { refOne } = this.props;

    return (
      <div className="formControl">
        <label htmlFor="imgUpload" className="fileLabel">
          Upload image
          <input id="imgUpload" type="file" ref={refOne} />
        </label>
      </div>
    );
  }
}
