import ImageBaseElement from "components/avatar/image-base.element";
import { IImageValue } from "components/form/input-image/input-image";
import { CloseIcon } from "components/icon/close-icon";
import React from "react";

const _PostInputImagePreview: React.FC<Props> = ({ image, onRemove }) => {
  return (
    <div className="post-input__image-preview-container">
      <div className="post-input__image-fixed-container">
        <ImageBaseElement
          className="post-input__image-preview"
          src={image.src}
        />
      </div>
      <div
        className="post-input__image-preview-remove"
        onClick={() => onRemove(image.id)}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

interface Props {
  onRemove: (id?: string) => void;
  image: IImageValue;
}

export const PostInputImagePreview = React.memo(_PostInputImagePreview);
