import "cropperjs/dist/cropper.css";

import "./profile-input-image.scss";

import classnames from "classnames";
import React, { Component } from "react";
import Cropper from "react-cropper";
import Dropzone from "react-dropzone";

import ProfileInputImageDefault from "./profile-input-image-default";

class ProfileInputImage extends Component {
  constructor(props) {
    super(props);
    const { onChange, value, name } = this.props;

    if (value.src) {
      onChange(name, { ...value, isDefault: false });
    } else {
      onChange(name, { ...value, isDefault: true });
    }
  }

  onDrop = files => {
    const { name, onChange } = this.props;
    if (files.length === 0) return;

    const img = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = {
        src: reader.result,
        filename: img.name,
        filetype: img.type,
        isNew: true,
        isDefault: false,
        isImageChanged: true
      };
      onChange(name, data);
    };
    reader.readAsDataURL(img);
  };

  catchImage = () => {
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
        isImageChanged: true,
        cropped: blob,
        width: croppedCanvas.width,
        height: croppedCanvas.height,
        size: blob.size
      };
      onChange(name, img);
    }, value.filetype);
  };

  openFileDialog = () => {
    this.dropzone.open();
  };

  clear = event => {
    const { onChange, name } = this.props;
    onChange(name, {
      cropped: null,
      src: "",
      isDefault: true,
      isNew: false,
      isImageChanged: true
    });
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { className, value, defaultImage, error } = this.props;
    const { isDefault, isNew, src } = value;
    const { onDrop, catchImage, clear } = this;
    return (
      <div
        className={classnames("profile-input-image", className, {
          "profile-input-image--error": error
        })}
      >
        <Dropzone
          disableClick
          className="profile-input-image__dropzone"
          activeClassName="profile-input-image__dropzone--active"
          accept="image/jpeg, image/png"
          ref={dropzone => {
            this.dropzone = dropzone;
          }}
          onDrop={onDrop}
        >
          <div className="profile-input-image__dropzone-helper">
            Drop files...
          </div>
          <div className="profile-input-image__dropzone-content">
            <div className="profile-input-image__image-container">
              {isNew && (
                <Cropper
                  ref={cropper => {
                    this.cropper = cropper;
                  }}
                  src={src}
                  aspectRatio={1}
                  autoCropArea={1}
                  imageSmoothingEnabled={false}
                  imageSmoothingQuality="high"
                  ready={catchImage}
                  cropend={catchImage}
                />
              )}

              {!isNew && !isDefault && (
                <span
                  className="profile-input-image__preview-img"
                  style={{
                    backgroundImage: `url(${src})`
                  }}
                />
              )}

              {!isNew && isDefault && (
                <ProfileInputImageDefault defaultImage={defaultImage} />
              )}
            </div>
            <p className="profile-input-image__text profile-input-image__text--big">
              Drag the image here or click{" "}
              <span
                className="profile-input-image__text-upload"
                onClick={this.openFileDialog}
              >
                upload
              </span>{" "}
              to browse your files
            </p>
            <p
              className="profile-input-image__text profile-input-image__text--small"
              onClick={this.openFileDialog}
            >
              Tap to upload the image
            </p>
          </div>
        </Dropzone>
        {!isDefault && (
          <div className="profile-input-image__clear-btn" onClick={clear}>
            &#10006;
          </div>
        )}
        {error && <div className="profile-input-image__error">{error}</div>}
      </div>
    );
  }
}

export default ProfileInputImage;
