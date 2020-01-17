import "./image-base.scss";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

import classNames from "classnames";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";

const _ImageBaseElement: React.FC<IImageBaseElementProps> = ({
  title,
  color,
  DefaultImageComponent,
  src = "",
  alt,
  defaultImage,
  className,
  defaultImageClassName
}) => {
  const emptyImg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAADklEQVR42mNkAANGCAUAACMAA2w/AMgAAAAASUVORK5CYII=";
  const hasUrl = src && src.length !== 0;
  const [isError, setIsError, setIsNotError] = useIsOpen();
  useEffect(() => {
    if (src) setIsNotError();
    else setIsError();
  }, [src]);
  const handleError = useCallback((e: any) => {
    e.target.onerror = null;
    setIsError();
  }, []);
  const currentSrc = isError ? defaultImage : src;
  const imgClassName = isError ? defaultImageClassName : "";
  return isError || !hasUrl ? (
    <div>
      {DefaultImageComponent ? (
        <DefaultImageComponent color={color} imageClassName={imgClassName} />
      ) : (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={emptyImg} alt="Image not found" className={imgClassName} />
      )}
    </div>
  ) : (
    <img
      /*src={
        emptyImg
      }
      data-src={currentSrc}*/
      src={currentSrc}
      title={title}
      alt={alt}
      className={classNames("lazyload", "blur-up", className, imgClassName)}
      onError={handleError}
    />
  );
};

const ImageBaseElement = React.memo(_ImageBaseElement);
export default ImageBaseElement;

export interface IImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export interface IImageBaseElementProps {
  title?: string;
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  src?: string;
  alt?: string;
  defaultImage?: string;
  className?: string;
  defaultImageClassName?: string;
}
