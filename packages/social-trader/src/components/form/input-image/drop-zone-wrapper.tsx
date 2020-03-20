import {
  IImageChangeEvent,
  IImageValue
} from "components/form/input-image/input-image";
import { loadFiles } from "components/form/input-image/input-image.helpers";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import "./input-image.scss";

type FileWithPreview = any;

export const DropZoneWrapper: React.FC<IDropZoneWrapperProps> = ({
  noDrag,
  disabled,
  onChange,
  name,
  content,
  className
}) => {
  const [t] = useTranslation();

  const onDrop = useCallback(
    (files: FileWithPreview[]) => {
      if (files.length === 0) return;
      const croppedFiles: IImageValue[] = [];

      loadFiles({ onChange, croppedFiles, files });
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
    noDrag,
    disabled,
    noClick: true,
    onDrop,
    accept: "image/jpeg, image/png"
  });
  return (
    <div {...getRootProps({ className })}>
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
      {content(open)}
    </div>
  );
};

export interface IDropZoneWrapperProps {
  noDrag?: boolean;
  disabled?: boolean;
  className?: string;
  name: string;
  onChange?: (event: IImageChangeEvent) => void;
  content: (open: VoidFunction) => JSX.Element;
}
