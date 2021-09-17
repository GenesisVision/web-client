import * as React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";
import LineWalletButton from "pages/wallet/components/wallet-tables/buttons/line-wallet-button";
import AssetSell from "modules/assets-table/components/buttons/asset-sell.button";
import { CoinsAsset } from "gv-api-web";

export const _LineSellButton: React.FC<Props> = ({
  disabled,
                                                   asset
}) => {
  const [t] = useTranslation();
  return (
    <LineWalletButton title={t("assets-page:buttons.sell")}>
      <AssetSell
        asset={asset}
        disabled={disabled}
      />
    </LineWalletButton>
  );
};

interface Props {
  asset: CoinsAsset;
  disabled?: boolean;
}

const LineSellButton = React.memo(_LineSellButton);
export default LineSellButton;
