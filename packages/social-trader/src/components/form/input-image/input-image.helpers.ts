import {
  IImageChangeEvent,
  IImageValue
} from "components/form/input-image/input-image";
import uuid from "uuid";

type FileWithPreview = any;

export const loadFiles = ({
  files,
  croppedFiles,
  onChange
}: {
  files: FileWithPreview[];
  croppedFiles: IImageValue[];
  onChange?: (event: IImageChangeEvent) => void;
}) => {
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = handleOnLoadReader({ file, croppedFiles, onChange });
    reader.readAsDataURL(file);
  });
};

export const handleOnLoadReader = ({
  file,
  croppedFiles,
  onChange
}: {
  file: FileWithPreview;
  croppedFiles: IImageValue[];
  onChange?: (event: IImageChangeEvent) => void;
}) => (e: ProgressEvent<FileReader>) => {
  let src = e.target?.result as string;
  let img = new Image();
  img.src = src;
  img.onload = () => {
    croppedFiles.push({
      src,
      id: uuid.v4(),
      image: {
        cropped: file,
        name: file.name,
        type: file.type,
        size: file.size,
        height: img.height,
        width: img.width,
        src
      }
    });
    onChange &&
      onChange({
        target: { value: croppedFiles, name: file.name }
      });
  };
};
