import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

import clsx from "clsx";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { OptionalClickable } from "utils/types";

export interface IImageBaseElementProps extends OptionalClickable {
  title?: string;
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  src?: string;
  alt?: string;
  defaultImage?: string;
  className?: string;
  defaultImageClassName?: string;
  fullSize?: boolean;
}

const Img = styled.img<IImageBaseElementProps>`
  ${({ fullSize = false }) =>
    fullSize &&
    `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `}
`;

const emptyImg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAADklEQVR42mNkAANGCAUAACMAA2w/AMgAAAAASUVORK5CYII=";

const _ImageBaseElement: React.FC<IImageBaseElementProps> = ({
  onClick,
  title,
  color,
  DefaultImageComponent,
  src = "",
  alt,
  defaultImage,
  fullSize,
  className,
  defaultImageClassName
}) => {
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

  const currentSrc = isError ? (defaultImage ? defaultImage : emptyImg) : src;
  if (isError || !hasUrl)
    return DefaultImageComponent ? (
      <DefaultImageComponent
        color={color}
        imageClassName={clsx(defaultImageClassName, className)}
      />
    ) : (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={defaultImage || emptyImg}
          alt="Image not found"
          className={clsx(defaultImageClassName, className)}
        />
      );
  return (
    <Img
      onClick={onClick}
      src={emptyImg}
      data-src={currentSrc}
      title={title}
      alt={alt || "Image loading"}
      className={clsx("lazyload", className)}
      onError={handleError}
      fullSize={fullSize}
    />
  );
};

const ImageBaseElement = React.memo(_ImageBaseElement);
export default ImageBaseElement;
