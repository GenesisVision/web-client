import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { CoinsAsset } from "gv-api-web";
import AssetTransferPopup from "modules/assets-table/components/asset-transfer/asset-transfer-popup";
import { Button } from "components/button/button";

const _AssetBuy: React.FC<Props> = ({ asset, disabled, id, onApply }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [t] = useTranslation();
  return (
    <>
      <Button disabled={disabled} color="primary" onClick={setOpenPopup}>
        {t("assets-page:buttons.buy")}
      </Button>
      <AssetTransferPopup
        currentAsset={asset}
        coinsId={id}
        onClose={setClosePopup}
        open={isOpenPopup}
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
