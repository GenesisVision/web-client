import imageCompression from "browser-image-compression";
import {
  IImageChangeEvent,
  IImageValue
} from "components/form/input-image/input-image";
import uuid from "uuid";

type FileWithPreview = any;
interface Options {
  /** @default Number.POSITIVE_INFINITY */
  maxSizeMB?: number;
  /** @default undefined */
  maxWidthOrHeight?: number;
  /** @default false */
  useWebWorker?: boolean;
  /** @default 10 */
  maxIteration?: number;
  /** Default to be the exif orientation from the image file */
  exifOrientation?: number;
  /** A function takes one progress argument (progress from 0 to 100) */
  onProgress?: (progress: number) => void;
  /** Default to be the original mime type from the image file */
  fileType?: string;
}

const asyncCompressImages = async (
  files: FileWithPreview[],
  options: Options
): Promise<FileWithPreview[]> => {
  const compressedFiles = [];
  try {
    for (const file of files) {
      const compressedFile = await imageCompression(file, options);
      compressedFiles.push(compressedFile);
    }
  } catch (e) {
    console.log(e);
  }
  return compressedFiles;
};

export const asyncLoadFiles = async ({
  files,
  croppedFiles,
  onChange,
  onProgress
}: {
  files: FileWithPreview[];
  croppedFiles: IImageValue[];
  onChange?: (event: IImageChangeEvent) => void;
  onProgress?: (progress: number) => void;
}): Promise<void> => {
  asyncCompressImages(files, { maxSizeMB: 2, useWebWorker: true, onProgress })
    .then(compressedFiles => {
      compressedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = handleOnLoadReader({ file, croppedFiles, onChange });
        reader.readAsDataURL(file);
      });
    })
    .catch(console.log);
};

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
