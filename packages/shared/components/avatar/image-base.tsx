import classNames from "classnames";
import * as React from "react";
import { useCallback } from "react";
import withUrl from "shared/decorators/with-url";
import useIsOpen from "shared/hooks/is-open.hook";

const _ImageBase: React.FC<IImageBaseProps> = ({
  url,
  alt,
  defaultImage,
  imageClassName,
  defaultImageClassName
}) => {
  const [isError, setIsError] = useIsOpen();
  const handleError = useCallback((e: any) => {
    e.target.onerror = null;
    setIsError();
  }, []);
  const currentSrc = isError || !url ? defaultImage : url;
  const className = isError || !url ? defaultImageClassName : "";
  return (
    <img
      alt={alt}
      className={classNames(imageClassName, className)}
      src={currentSrc}
      onError={handleError}
    />
  );
};

const ImageBase = withUrl<IImageBaseProps>("url")(React.memo(_ImageBase));
export default ImageBase;

export interface IImageProps {
  url: string;
  alt: string;
  className?: string;
}

export interface IImageBaseProps {
  url: string;
  alt: string;
  defaultImage: string;
  imageClassName?: string;
  defaultImageClassName?: string;
}
