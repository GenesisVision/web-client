import ImageBaseElement from "components/avatar/image-base.element";
import { IImageValue } from "components/form/input-image/input-image";
import { CloseIcon } from "components/icon/close-icon";
import React from "react";

import styles from "./post-input.module.scss";

interface Props {
  onRemove: (id?: string) => void;
  image: IImageValue;
}

const _PostInputImagePreview: React.FC<Props> = ({ image, onRemove }) => {
  return (
    <div className={styles["post-input__image-preview-container"]}>
      <div className={styles["post-input__image-fixed-container"]}>
        <ImageBaseElement
          className={styles["post-input__image-preview"]}
          src={image.src}
        />
      </div>
      <div
        className={styles["post-input__image-preview-remove"]}
        onClick={() => onRemove(image.id)}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export const PostInputImagePreview = React.memo(_PostInputImagePreview);
