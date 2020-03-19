import ImageBaseElement from "components/avatar/image-base.element";
import useUrl, { ImageQualityType } from "hooks/url.hook";
import * as React from "react";

const _ImageBase: React.FC<IImageBaseProps> = ({
  onClick,
  quality,
  title,
  color,
  DefaultImageComponent,
  src,
  alt,
  defaultImage,
  className,
  defaultImageClassName
}) => {
  const { getUrl } = useUrl();
  const fullUrl = getUrl(src, quality);
  return (
    <ImageBaseElement
      onClick={onClick}
      defaultImageClassName={defaultImageClassName}
      defaultImage={defaultImage}
      color={color}
      DefaultImageComponent={DefaultImageComponent}
      title={title}
      alt={alt}
      className={className}
      src={fullUrl}
    />
  );
};

const ImageBase = React.memo(_ImageBase);
export default ImageBase;

export interface IImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export interface IImageBaseProps {
  onClick?: VoidFunction;
  quality?: ImageQualityType;
  title?: string;
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  src?: string;
  alt?: string;
  defaultImage?: string;
  className?: string;
  defaultImageClassName?: string;
}
