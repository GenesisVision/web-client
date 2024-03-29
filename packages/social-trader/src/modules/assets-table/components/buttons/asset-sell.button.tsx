import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { CoinsAsset } from "gv-api-web";
import AssetTransferPopup from "modules/assets-table/components/asset-transfer/asset-transfer-popup";
import { Button } from "components/button/button";

const _AssetSell: React.FC<Props> = ({ disabled, asset, id, onApply }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [t] = useTranslation();

  return (
    <>
      <Button disabled={disabled} variant={"outlined"} color={"danger"} onClick={setOpenPopup}>
        {t("assets-page:buttons.sell")}
      </Button>
      <AssetTransferPopup
        currentAsset={asset}
        coinsId={id}
        onClose={setClosePopup}
        open={isOpenPopup}
        onApply={onApply}
        isSell
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
