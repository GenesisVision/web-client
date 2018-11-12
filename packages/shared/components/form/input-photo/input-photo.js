import "cropperjs/dist/cropper.css";

import "./input-photo.scss";

import classnames from "classnames";
import React, { Component } from "react";
import Cropper from "react-cropper";
import Dropzone from "react-dropzone";
import { translate } from "react-i18next";

import InputPhotoDefault from "./input-photo-default";

export const getInputPhotoInitialValue = () => ({
  isDefault: true,
  isUpdated: false,
  isCrop: false,
  cropped: null,
  src: "",
  width: undefined,
  height: undefined,
  size: undefined,
  filetype: undefined
});

class InputPhoto extends Component {
  constructor(props) {
    super(props);
    const { onChange, value, name } = this.props;

    if (value.src) {
      onChange(name, { ...value, isDefault: false });
    }
  }

  componentDidUpdate() {
    const { name, value, onChange } = this.props;
    if (value.src && value.isDefault) {
      onChange(name, { ...value, isDefault: false });
    }
  }

  onDrop = files => {
    const { name, onChange } = this.props;
    if (files.length === 0) return;

    const img = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = {
        ...getInputPhotoInitialValue(),
        src: reader.result,
        filename: img.name,
        filetype: img.type,
        isDefault: false,
        isCrop: true
      };
      onChange(name, data);
    };
    reader.readAsDataURL(img);
  };

  onCrop = () => {
    const { name, value, onChange } = this.props;
    const cropper = this.cropper;

    if (!cropper) return;

    const croppedCanvas = cropper.getCroppedCanvas();

    if (!croppedCanvas) return;

    croppedCanvas.toBlob(blob => {
      if (blob !== null) {
        blob.name = value.filename;
      }
      const img = {
        ...value,
        cropped: blob,
        width: croppedCanvas.width,
        height: croppedCanvas.height,
        size: blob.size,
        isUpdated: true
      };
      onChange(name, img);
    }, value.filetype);
  };

  openFileDialog = () => {
    this.dropzone.open();
  };

  clear = event => {
    const { onChange, name, value } = this.props;
    if (value.isDefault) return;
    onChange(name, {
      cropped: null,
      src: "",
      isDefault: true,
      isCrop: false,
      isUpdated: true,
      width: undefined,
      height: undefined,
      size: undefined
    });
    event.preventDefault();
    event.stopPropagation();
  };

  get isShowDefaultImage() {
    const { isDefault, isCrop } = this.props.value;

    return isDefault && !isCrop;
  }

  get isShowPreview() {
    const { isDefault, isCrop } = this.props.value;

    return !isDefault && !isCrop;
  }

  get isShowCropper() {
    return this.props.value.isCrop;
  }

  render() {
    const { className, value, defaultImage, error, t } = this.props;
    const { isDefault, src } = value;
    const {
      onDrop,
      onCrop,
      clear,
      isShowDefaultImage,
      isShowPreview,
      isShowCropper
    } = this;
    return (
      <div
        className={classnames("input-photo", className, {
          "input-photo--error": error
        })}
        ref={rootElement => {
          this.rootElement = rootElement;
        }}
      >
        <Dropzone
          disableClick
          className="input-photo__dropzone"
          activeClassName="input-photo__dropzone--active"
          accept="image/jpeg, image/png"
          ref={dropzone => {
            this.dropzone = dropzone;
          }}
          onDrop={onDrop}
        >
          <div className="input-photo__dropzone-helper">
            {t("fields.input-photo.drop-files")}
          </div>
          <div className="input-photo__dropzone-content">
            <div className="input-photo__image-container">
              {isShowDefaultImage && (
                <InputPhotoDefault defaultImage={defaultImage} />
              )}
              {isShowPreview && (
                <span
                  className="input-photo__preview-img"
                  style={{
                    backgroundImage: `url(${src})`
                  }}
                />
              )}
              {isShowCropper && (
                <Cropper
                  ref={cropper => {
                    this.cropper = cropper;
                  }}
                  src={src}
                  aspectRatio={1}
                  autoCropArea={1}
                  imageSmoothingEnabled={false}
                  imageSmoothingQuality="high"
                  ready={onCrop}
                  cropend={onCrop}
                  scalable={false}
                  zoomable={false}
                />
              )}
            </div>
            <p
              className="input-photo__text input-photo__text--big"
              onClick={this.openFileDialog}
            >
              {t("fields.input-photo.text-download--big")}
            </p>
            <p
              className="input-photo__text input-photo__text--small"
              onClick={this.openFileDialog}
            >
              {t("fields.input-photo.text-download--small")}
            </p>
          </div>
        </Dropzone>
        {!isDefault && (
          <div className="input-photo__clear-btn" onClick={clear}>
            &#10006;
          </div>
        )}
        {error && <div className="input-photo__error">{error}</div>}
      </div>
    );
  }
}

export default translate()(InputPhoto);
