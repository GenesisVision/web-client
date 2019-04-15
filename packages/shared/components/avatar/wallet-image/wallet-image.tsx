import React, { FunctionComponent } from "react";
import WalletCurrency from "shared/media/wallet-currency.svg";

import ImageBase, { IImageProps } from "../image-base";

const WalletImage: FunctionComponent<Props & IImageProps> = ({
  url,
  alt,
  className,
  imageClassName
}) => {
  return (
    <div className={className}>
      <ImageBase
        url={url}
        alt={alt}
        defaultImage={WalletCurrency}
        imageClassName={imageClassName}
      />
    </div>
  );
};

export default WalletImage;

interface Props {
  imageClassName?: string;
}
