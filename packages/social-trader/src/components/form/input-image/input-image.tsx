import "cropperjs/dist/cropper.css";
import "./input-image.scss";

import classNames from "classnames";
import * as React from "react";
import Cropper from "react-cropper";
import Dropzone, { FileWithPreview } from "react-dropzone";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import InputImageDefault from "./input-image-default";

class _InputImage extends React.PureComponent<
  IInputImageProps & WithTranslation
> {
  dropzone: React.RefObject<Dropzone> = React.createRef();
  cropper: React.RefObject<Cropper> = React.createRef();

  onDrop = (files: FileWithPreview[]) => {
    const { name, onChange } = this.props;
    if (files.length === 0) return;

    if (this.cropper.current) {
      // @ts-ignore
      this.cropper.current.reset();
    }

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
  };

  onCropReady = () => {
    const { error } = this.props;
    if (error) return;
    this.onCrop();
  };

  onCrop = () => {
    const { onChange, name, value } = this.props;
    const { image } = value;

    if (!image || !this.cropper.current) return;

    // @ts-ignore
    const croppedCanvas = this.cropper.current.getCroppedCanvas({
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high"
    });

    croppedCanvas.toBlob(
      // @ts-ignore
      blob => {
        let croppedImg;
        if (!blob) {
          croppedImg = {
            ...image,
            width: 0,
            height: 0,
            size: 0
          };
        } else {
          croppedImg = {
            ...image,
            cropped: new File([blob], image.name, {
              type: blob.type
            }),
            width: croppedCanvas.width,
            height: croppedCanvas.height,
            size: blob.size
          };
        }
        onChange({
          target: { value: { image: croppedImg }, name }
        });
      },
      image.type,
      1
    );
  };

  openFileDialog = () => {
    if (!this.dropzone.current) return;
    this.dropzone.current.open();
  };

  clear = (event: React.SyntheticEvent) => {
    this.setDefaultImage();
    event.stopPropagation();
  };

  setDefaultImage = () => {
    const { onChange, name } = this.props;
    this.setState({ newImage: undefined, isDefault: true });
    const e: IImageChangeEvent = {
      target: { value: {}, name }
    };
    onChange(e);
  };

  renderErrors = () => {
    if (!this.props.error) return null;
    const errors = Object.values(this.props.error.image);
    return (
      <div>
        {errors.map(error => (
          <div className="input-image__error">{error.message}</div>
        ))}
      </div>
    );
  };

  render() {
    const { t, value = {}, className, defaultImage, error } = this.props;
    const { src, image } = value;
    const hasSizeError = error && error.image.size;
    return (
      <div
        className={classNames("input-image", className, {
          "input-image--error": error !== undefined
        })}
      >
        <Dropzone
          disableClick
          className="input-image__dropzone"
          activeClassName="input-image__dropzone--active"
          accept="image/jpeg, image/png"
          ref={this.dropzone}
          onDrop={this.onDrop}
        >
          <div className="input-image__dropzone-helper">
            {t("input-image.drop-files")}
          </div>
          <div className="input-image__dropzone-content">
            <div className="input-image__image-container">
              {image && !hasSizeError && (
                // @ts-ignore
                <Cropper
                  ref={this.cropper as React.RefObject<Cropper> & string}
                  src={image.src}
                  // @ts-ignore
                  aspectRatio={1}
                  autoCropArea={1}
                  ready={this.onCropReady}
                  cropend={this.onCrop}
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
              <span
                className="input-image__text-upload"
                onClick={this.openFileDialog}
              >
                {t("input-image.upload")}
              </span>
              {t("input-image.to-browse")}
            </p>
            <p
              className="input-image__text input-image__text--small"
              onClick={this.openFileDialog}
            >
              {t("input-image.tap-to-upload")}
            </p>
          </div>
        </Dropzone>
        {(image || src) && (
          <div className="input-image__clear-btn" onClick={this.clear}>
            &#10006;
          </div>
        )}
        {this.renderErrors()}
      </div>
    );
  }
}

const InputImage = translate()(_InputImage);
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
