import "./fund-asset-image.scss";

import classNames from "classnames";
import FundAsset from "media/fund-asset.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";

const _FundAssetImage: React.FC<IImageProps> = ({ url, alt, className }) => (
  <div className={classNames("fund-asset-icon", className)}>
    <ImageBase
      src={url}
      alt={alt}
      defaultImage={FundAsset}
      className="fund-asset-icon__img"
    />
  </div>
);

const FundAssetImage = React.memo(_FundAssetImage);
export default FundAssetImage;
