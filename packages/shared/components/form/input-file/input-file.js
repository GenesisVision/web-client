import "cropperjs/dist/cropper.css";

import "./input-file.scss";

import classnames from "classnames";
import React, { PureComponent } from "react";
import Cropper from "react-cropper";
import Dropzone from "react-dropzone";

class InputFile extends PureComponent {
  onDrop = files => {
    const { name } = this.props.field;
    const { setFieldValue } = this.props.form;
    if (files.length === 0) {
      return;
    } else {
      const img = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const data = {
          src: reader.result,
          filename: img.name,
          filetype: img.type,
          isNew: true
        };
        setFieldValue(name, data);
      };
      reader.readAsDataURL(img);
    }
  };

  onCrop = () => {
    const { name, value } = this.props.field;
    const { setFieldValue } = this.props.form;
    const croppedCanvas = this.cropper.getCroppedCanvas();

    if (!croppedCanvas) return;

    croppedCanvas.toBlob(blob => {
      if (blob !== null) {
        blob.name = value.filename;
      }
      const img = {
        ...value,
        cropped: blob
      };
      setFieldValue(name, img);
    }, value.filetype);
  };

  openFileDialog = () => {
    this.dropzone.open();
  };

  render() {
    const {
      label,
      className,
      field: { value }
    } = this.props;
    return (
      <div className={classnames("input-file", className)}>
        {label && <div className="input-file__label">{label}</div>}
        <div className="input-file__avatar">
          <div className="input-file__dropzone">
            <Dropzone
              disableClick
              className="dropzone"
              activeClassName="dropzone--active"
              accept="image/jpeg, image/png"
              ref={dropzone => {
                this.dropzone = dropzone;
              }}
              onDrop={this.onDrop}
            >
              <div className="dropzone-helper">Drop files...</div>
              <div>
                {value.isNew ? (
                  <Cropper
                    ref={cropper => {
                      this.cropper = cropper;
                    }}
                    src={value.src}
                    aspectRatio={1}
                    autoCropArea={1}
                    imageSmoothingEnabled={false}
                    imageSmoothingQuality="high"
                    crop={this.onCrop}
                  />
                ) : (
                  <img src={value.src} alt="Program Avatar" />
                )}
                <p className="input-file__text--big">
                  Drag the image here or click{" "}
                  <span
                    className="input-file__text--lighter"
                    onClick={this.openFileDialog}
                  >
                    upload
                  </span>{" "}
                  to browse your files
                </p>
                <p
                  className="input-file__text--small"
                  onClick={this.openFileDialog}
                >
                  Tap to upload the image
                </p>
              </div>
            </Dropzone>
          </div>
        </div>
      </div>
    );
  }
}

export default InputFile;
