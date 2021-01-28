import ImageBaseElement from "components/avatar/image-base.element";
import { ImageQuality } from "gv-api-web";
import * as React from "react";
import { OptionalClickable } from "utils/types";

export interface IImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export interface IImageBaseProps extends OptionalClickable {
  quality?: ImageQuality;
  title?: string;
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  src?: string;
  alt?: string;
  defaultImage?: string;
  className?: string;
  defaultImageClassName?: string;
  hasStaticIcon?: boolean;
}

const _ImageBase: React.FC<IImageBaseProps> = ({
  onClick,
  quality,
  title,
  color,
  DefaultImageComponent,
  src,
  alt,
  hasStaticIcon,
  defaultImage,
  className,
  defaultImageClassName
}) => {
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
      src={src}
      hasStaticIcon={hasStaticIcon}
    />
  );
};

const ImageBase = React.memo(_ImageBase);
export default ImageBase;
