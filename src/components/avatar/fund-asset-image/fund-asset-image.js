import "./fund-asset-image.scss";

import classnames from "classnames";
import React from "react";
import FundAsset from "shared/media/fund-asset.svg";

import ImageBase from "../image-base";

const FundAssetImage = ({ url, alt, className, imageClassName }) => {
  className = classnames("fund-asset", className);
  imageClassName = classnames("fund-asset__img", imageClassName);
  return (
    <ImageBase
      url={url}
      alt={alt}
      defaultImage={FundAsset}
      className={className}
      imageClassName={imageClassName}
    />
  );
};

export default FundAssetImage;
