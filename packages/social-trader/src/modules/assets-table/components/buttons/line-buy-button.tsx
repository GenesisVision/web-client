import * as React from "react";
import { useTranslation } from "react-i18next";
import LineWalletButton from "pages/wallet/components/wallet-tables/buttons/line-wallet-button";
import AssetBuy from "modules/assets-table/components/buttons/asset-buy.button";
import { CoinsAsset } from "gv-api-web";

export const _LineBuyButton: React.FC<Props> = ({ disabled, asset }) => {
  const [t] = useTranslation();
  return (
    <>
      <LineWalletButton title={t("assets-page:buttons.buy")}>
        <AssetBuy
          asset={asset}
          disabled={disabled}
        />
      </LineWalletButton>
    </>
  );
};

interface Props {
  asset: CoinsAsset;
  disabled?: boolean;
}

const LineBuyButton = React.memo(_LineBuyButton);
export default LineBuyButton;
