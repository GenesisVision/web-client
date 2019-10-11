import classNames from "classnames";
import * as React from "react";
import { useCallback, useEffect } from "react";
import useIsOpen from "shared/hooks/is-open.hook";
import useUrl from "shared/hooks/url.hook";

const _ImageBase: React.FC<IImageBaseProps> = ({
  color,
  DefaultImageComponent,
  url,
  alt,
  defaultImage,
  imageClassName,
  defaultImageClassName
}) => {
  const fullUrl = useUrl(url);
  const hasUrl = fullUrl.length !== 0;
  const [isError, setIsError, setIsNotError] = useIsOpen();
  useEffect(() => {
    if (url) setIsNotError();
    else setIsError();
  }, [setIsError, setIsNotError, url]);
  const handleError = useCallback(
    (e: any) => {
      e.target.onerror = null;
      setIsError();
    },
    [setIsError]
  );
  const currentSrc = isError ? defaultImage : fullUrl;
  const className = isError ? defaultImageClassName : "";
  return (isError || !hasUrl) && DefaultImageComponent ? (
    <DefaultImageComponent color={color} imageClassName={className} />
  ) : (
    <img
      alt={alt}
      className={classNames(imageClassName, className)}
      src={currentSrc}
      onError={handleError}
    />
  );
};

const ImageBase = React.memo(_ImageBase);
export default ImageBase;

export interface IImageProps {
  url: string;
  alt: string;
  className?: string;
}

export interface IImageBaseProps {
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  url?: string;
  alt: string;
  defaultImage?: string;
  imageClassName?: string;
  defaultImageClassName?: string;
}
