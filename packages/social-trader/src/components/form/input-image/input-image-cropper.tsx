import {
  IImageChangeEvent,
  INewImage
} from "components/form/input-image/input-image";
import * as React from "react";
import Cropper from "react-cropper";

export class InputImageCropper extends React.PureComponent<{
  error?: any;
  image: INewImage;
  onChange: (event: IImageChangeEvent) => void;
}> {
  cropper: React.RefObject<Cropper> = React.createRef();
  date = new Date();

  onCropReady = () => {
    const { error } = this.props;
    if (error) return;
    this.onCrop();
  };

  onCrop = () => {
    const { image, onChange } = this.props;

    if (!this.cropper.current) return;

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
          target: { value: [{ image: croppedImg }], name: image.name }
        });
      },
      image.type,
      1
    );
  };
  render() {
    const { image } = this.props;
    return (
      <Cropper
        ref={this.cropper as React.RefObject<Cropper> & string}
        src={image.src}
        aspectRatio={1}
        autoCropArea={1}
        ready={this.onCropReady}
        cropend={this.onCrop}
      />
    );
  }
}
