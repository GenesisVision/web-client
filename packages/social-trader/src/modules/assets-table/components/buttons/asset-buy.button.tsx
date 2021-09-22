import { CHIP_TYPE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { CoinsAsset } from "gv-api-web";
import AssetTransferPopup from "modules/assets-table/components/asset-transfer/asset-transfer-popup";

const _AssetBuy: React.FC<Props> = ({ asset, disabled, id, onApply }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [t] = useTranslation();
  return (
    <>
      <ChipButton
        disabled={disabled}
        className={t("assets-page:buttons.buy")}
        onClick={setOpenPopup}
        size={"small"}
        chipLabel={"+"}
        type={CHIP_TYPE.POSITIVE}
      />
      <AssetTransferPopup
        currentAsset={asset}
        idCoins={id}
        onClose={setClosePopup}
        open={isOpenPopup}
        title={t("assets-page:popup.buy-title")}
        sourceType={"Wallet"}
        destinationType={"CoinsMarket"}
        onApply={onApply}
      />
    </>
  );
};

interface Props {
  disabled?: boolean;
  asset: CoinsAsset;
  id: string;
  onApply?: VoidFunction;
}

const AssetBuy = React.memo(_AssetBuy);
export default AssetBuy;
