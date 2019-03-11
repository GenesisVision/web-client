import "./fund-asset-image.scss";

import classNames from "classnames";
import * as React from "react";
import FundAsset from "shared/media/fund-asset.svg";

import ImageBase from "../image-base";

interface IFundAssetImageProps {
  url: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

const FundAssetImage: React.FC<IFundAssetImageProps> = ({
  url,
  alt,
  className,
  imageClassName
}) => (
  <ImageBase
    url={url}
    alt={alt}
    defaultImage={FundAsset}
    className={classNames("fund-asset-icon", className)}
    imageClassName={classNames("fund-asset-icon__img", imageClassName)}
  />
);

export default FundAssetImage;
