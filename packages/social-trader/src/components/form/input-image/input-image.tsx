import { DropZoneWrapper } from "components/form/input-image/drop-zone-wrapper";
import {
  InputImageClearButton,
  InputImageContainer,
  InputImageDropZoneContent,
  InputImageError,
  InputImageImageContainer,
  InputImageStyledSpan,
  InputImageStyledText
} from "components/form/input-image/input-image.styles";
import { InputImageCropper } from "components/form/input-image/input-image-cropper";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import InputImageDefault from "./input-image-default";

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
  value: IImageValue;
  defaultImage: string;
  error?: { image: { [field: string]: { message: string } } };
  onChange: (event: IImageChangeEvent) => void;
}

const _InputImage: React.FC<IInputImageProps> = ({
  value = {},
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

  const hasSizeError = error && error?.image?.size;
  return (
    <InputImageContainer error={!!error}>
      <DropZoneWrapper
        name={name}
        onChange={onChange}
        content={({ open }) => (
          <InputImageDropZoneContent>
            <InputImageImageContainer>
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
            </InputImageImageContainer>
            <InputImageStyledText desktop size={"small"} muted>
              {t("form-fields:input-image.drag-or-click")}
              <InputImageStyledSpan onClick={open}>
                {t("form-fields:input-image.upload")}
              </InputImageStyledSpan>
              {t("form-fields:input-image.to-browse")}
            </InputImageStyledText>
            <InputImageStyledText mobile size={"small"} onClick={open}>
              {t("form-fields:input-image.tap-to-upload")}
            </InputImageStyledText>
          </InputImageDropZoneContent>
        )}
      />
      {(image || src) && (
        <InputImageClearButton onClick={clear}>&#10006;</InputImageClearButton>
      )}
      {error && (
        <div>
          <InputImageError>{error}</InputImageError>
        </div>
      )}
    </InputImageContainer>
  );
};

const InputImage = React.memo(_InputImage);
export default InputImage;
