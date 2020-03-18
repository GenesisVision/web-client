import classNames from "classnames";
import { InputImageCropper } from "components/form/input-image/input-image-cropper";
import "cropperjs/dist/cropper.css";
import * as React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import InputImageDefault from "./input-image-default";
import "./input-image.scss";

type FileWithPreview = any;

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

  const onDrop = useCallback(
    (files: FileWithPreview[]) => {
      if (files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        let src = reader.result as string;
        let img = new Image();
        img.src = src;
        img.onload = () => {
          const cropped: INewImage = {
            cropped: file,
            name: file.name,
            type: file.type,
            size: file.size,
            height: img.height,
            width: img.width,
            src
          };

          onChange({
            target: { value: { image: cropped }, name }
          });
        };
      };
      reader.readAsDataURL(file);
    },
    [onChange, name]
  );

  const {
    open,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    noClick: true,
    onDrop,
    accept: "image/jpeg, image/png"
  });

  const clear = useCallback(
    (event: React.SyntheticEvent) => {
      const e: IImageChangeEvent = {
        target: { value: {}, name }
      };
      onChange(e);
      event.stopPropagation();
    },
    [onChange]
  );

  const hasSizeError = error && error.image.size;
  return (
    <div
      className={classNames("input-image", className, {
        "input-image--error": error !== undefined
      })}
    >
      <div {...getRootProps({ className: "input-image__dropzone" })}>
        <input {...getInputProps()} />
        {isDragAccept && (
          <div className="input-image__dropzone-helper">
            {t("input-image.drop-files")}
          </div>
        )}
        {isDragReject && (
          <div className="input-image__dropzone-helper">
            {t("Some files will be rejected")}
          </div>
        )}

        <div className="input-image__dropzone-content">
          <div className="input-image__image-container">
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
          <p className="input-image__text input-image__text--big">
            {t("input-image.drag-or-click")}
            <span className="input-image__text-upload" onClick={open}>
              {t("input-image.upload")}
            </span>
            {t("input-image.to-browse")}
          </p>
          <p
            className="input-image__text input-image__text--small"
            onClick={open}
          >
            {t("input-image.tap-to-upload")}
          </p>
        </div>
      </div>
      {(image || src) && (
        <div className="input-image__clear-btn" onClick={clear}>
          &#10006;
        </div>
      )}
      {error && (
        <div>
          {Object.values(error.image).map((error: any) => (
            <div className="input-image__error">{error.message}</div>
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
  target: { value: IImageValue; name: string };
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
