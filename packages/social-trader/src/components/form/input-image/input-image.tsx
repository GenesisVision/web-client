import classNames from "classnames";
import { DropZoneWrapper } from "components/form/input-image/drop-zone-wrapper";
import { InputImageCropper } from "components/form/input-image/input-image-cropper";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import InputImageDefault from "./input-image-default";
import styles from "./input-image.module.scss";

const _InputImage: React.FC<IInputImageProps> = ({
  value = {},
  className,
  defaultImage,
  error,
  onChange,
  name
}) => {
  const { src, image } = value;

  const [t] = useTranslation();

  const clear = useCallback(
    (event: React.SyntheticEvent) => {
      const e: IImageChangeEvent = {
        target: { value: [{}], name }
      };
      onChange(e);
      event.stopPropagation();
    },
    [onChange]
  );

  const hasSizeError = error && error.image.size;
  return (
    <div
      className={classNames(styles["input-image"], className, {
        [styles["input-image--error"]]: error !== undefined
      })}
    >
      <DropZoneWrapper
        className={styles["input-image__dropzone"]}
        name={name}
        onChange={onChange}
        content={({ open }) => (
          <div className={styles["input-image__dropzone-content"]}>
            <div className={styles["input-image__image-container"]}>
              {image && !hasSizeError && (
                <InputImageCropper
                  error={error}
                  image={image}
                  onChange={onChange}
                />
              )}

              {image && hasSizeError && (
                <InputImageDefault defaultImage={image.src} />
              )}

              {!image && (
                <InputImageDefault src={src} defaultImage={defaultImage} />
              )}
            </div>
            <p
              className={classNames(
                styles["input-image__text"],
                styles["input-image__text--big"]
              )}
            >
              {t("input-image.drag-or-click")}
              <span
                className={styles["input-image__text-upload"]}
                onClick={open}
              >
                {t("input-image.upload")}
              </span>
              {t("input-image.to-browse")}
            </p>
            <p
              className={classNames(
                styles["input-image__text"],
                styles["input-image__text--small"]
              )}
              onClick={open}
            >
              {t("input-image.tap-to-upload")}
            </p>
          </div>
        )}
      />
      {(image || src) && (
        <div className={styles["input-image__clear-btn"]} onClick={clear}>
          &#10006;
        </div>
      )}
      {error && (
        <div>
          {Object.values(error.image).map((error: any) => (
            <div className={styles["input-image__error"]}>{error.message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const InputImage = React.memo(_InputImage);
export default InputImage;

export interface INewImage {
  cropped: File;
  src: string;
  name: string;
  type: string;
  width: number;
  height: number;
  size: number;
}

export interface IImageChangeEvent {
  target: { value: IImageValue[]; name: string };
}

export type IImageValue = {
  src?: string;
  image?: INewImage;
  id?: string;
};

export interface IInputImageProps {
  name: string;
  className?: string;
  value: IImageValue;
  defaultImage: string;
  error?: { image: { [field: string]: { message: string } } };
  onChange: (event: IImageChangeEvent) => void;
}
