import WalletCurrency from "media/wallet-currency.svg";
import * as React from "react";

import ImageBase, { IAmpImgProps, IImageProps } from "../image-base";

const _WalletImage: React.FC<Props> = ({
  url,
  alt,
  imageClassName,
  ampProps
}) => {
  return (
    <ImageBase
      ampProps={ampProps}
      src={url}
      alt={alt}
      defaultImage={WalletCurrency}
      className={imageClassName}
    />
  );
};

const WalletImage = React.memo(_WalletImage);
export default WalletImage;

interface Props extends IImageProps {
  ampProps?: IAmpImgProps;
  imageClassName?: string;
}
