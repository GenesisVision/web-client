import WalletCurrency from "media/wallet-currency.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";

const _WalletImage: React.FC<Props> = ({
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

const WalletImage = React.memo(_WalletImage);
export default WalletImage;

interface Props extends IImageProps {
  imageClassName?: string;
}
