import ImageBaseElement from "components/avatar/image-base.element";
import ChipButton from "components/chip/chip-button";
import useIsOpen from "hooks/is-open.hook";
import ArrowIcon from "media/arrow-up.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { CoinsAsset } from "gv-api-web";
import AssetTransferPopup from "modules/assets-table/components/asset-transfer/asset-transfer-popup";

const _AssetSell: React.FC<Props> = ({ disabled, asset, id, onApply }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [t] = useTranslation();
  const label = t("assets-page:buttons.sell");

  return (
    <>
      <ChipButton
        disabled={disabled}
        className={label}
        onClick={setOpenPopup}
        size={"small"}
        chipLabel={<ImageBaseElement src={ArrowIcon} alt={label} />}
      />
      <AssetTransferPopup
        currentAsset={asset}
        idCoins={id}
        onClose={setClosePopup}
        open={isOpenPopup}
        title={t("assets-page:popup.sell-title")}
        sourceType={"CoinsMarket"}
        destinationType={"Wallet"}
        onApply={onApply}
      />
    </>
  );
};

interface Props {
  asset: CoinsAsset;
  disabled?: boolean;
  id: string;
  onApply?: VoidFunction;
}

const AssetSell = React.memo(_AssetSell);
export default AssetSell;
