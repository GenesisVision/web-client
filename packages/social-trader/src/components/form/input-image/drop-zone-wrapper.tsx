import {
  IImageChangeEvent,
  IImageValue
} from "components/form/input-image/input-image";
import { asyncLoadFiles } from "components/form/input-image/input-image.helpers";
import {
  DropZoneWrapperContainer,
  DropZoneWrapperHelper,
  DropZoneWrapperIndicator
} from "components/form/input-image/input-image.styles";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

export interface IDropZoneWrapperProps {
  showIndicator?: boolean;
  noDrag?: boolean;
  disabled?: boolean;
  name: string;
  onChange?: (event: IImageChangeEvent) => void;
  content: (options: {
    open: VoidFunction;
    onPaste: (e?: any) => void;
  }) => JSX.Element;
}

type FileWithPreview = any;

export const DropZoneWrapper: React.FC<IDropZoneWrapperProps> = ({
  showIndicator = true,
  noDrag,
  disabled,
  onChange,
  name,
  content
}) => {
  const [t] = useTranslation();
  const [indicatorValue, setIndicatorValue] = useState<number>(0);
  const handleUploadProgress = useCallback(value => {
    setIndicatorValue(value === 100 ? 0 : value);
  }, []);

  const uploadFiles = useCallback(
    (files: FileWithPreview[]) => {
      if (files.length === 0) return;
      const croppedFiles: IImageValue[] = [];
      asyncLoadFiles({
        onChange,
        croppedFiles,
        files,
        onProgress: handleUploadProgress
      });
    },
    [onChange, name]
  );

  const onDrop = useCallback(
    (files: FileWithPreview[]) => {
      uploadFiles(files);
    },
    [uploadFiles]
  );

  const onPaste = useCallback(
    (files: FileWithPreview[]) => {
      uploadFiles(files);
    },
    [uploadFiles]
  );

  const {
    open,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    noDrag,
    disabled,
    noClick: true,
    onDrop,
    accept: "image/gif, image/jpeg, image/png"
  });
  return (
    <DropZoneWrapperContainer {...getRootProps({})}>
      {showIndicator && <DropZoneWrapperIndicator width={indicatorValue} />}
      <input {...getInputProps()} />
      {isDragAccept && (
        <DropZoneWrapperHelper>
          {t("form-fields:input-image.drop-files")}
        </DropZoneWrapperHelper>
      )}
      {isDragReject && (
        <DropZoneWrapperHelper>
          {t("Some files will be rejected")}
        </DropZoneWrapperHelper>
      )}
      {content({ open, onPaste })}
    </DropZoneWrapperContainer>
  );
};
