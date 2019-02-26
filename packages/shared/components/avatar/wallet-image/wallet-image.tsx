import React, { FunctionComponent } from "react";
import WalletCurrency from "shared/media/wallet-currency.svg";

import ImageBase, { IImageProps } from "../image-base";

const WalletImage: FunctionComponent<IImageProps> = ({
  url,
  alt,
  className,
  imageClassName
}) => {
  return (
    <ImageBase
      url={url}
      alt={alt}
      defaultImage={WalletCurrency}
      className={className}
      imageClassName={imageClassName}
    />
  );
};

export default WalletImage;
