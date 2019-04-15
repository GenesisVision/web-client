import "./fund-asset-image.scss";

import classNames from "classnames";
import * as React from "react";
import FundAsset from "shared/media/fund-asset.svg";

import ImageBase, { IImageProps } from "../image-base";

const FundAssetImage: React.FC<IImageProps> = ({ url, alt, className }) => (
  <div className={classNames("fund-asset-icon", className)}>
    <ImageBase
      url={url}
      alt={alt}
      defaultImage={FundAsset}
      imageClassName="fund-asset-icon__img"
    />
  </div>
);

export default FundAssetImage;
