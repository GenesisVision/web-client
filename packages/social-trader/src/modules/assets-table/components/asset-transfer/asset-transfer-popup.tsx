import Dialog from "components/dialog/dialog";
import { AssetsTransferProps } from "modules/assets-table/components/asset-transfer/assets-transfer-container";
import dynamic from "next/dynamic";
import * as React from "react";

const AssetsTransferContainer = dynamic(
  () => import("./assets-transfer-container")
);

const _AssetTransferPopup: React.FC<Props> = ({
  currentAsset,
  coinsId,
  onClose,
  open,
  onApply,
  isSell
}) => {
  return (
    <Dialog open={open} onClose={onClose!}>
      <AssetsTransferContainer
        onClose={onClose}
        currentAsset={currentAsset}
        coinsId={coinsId}
        onApply={onApply}
        isSell={isSell}
      />
    </Dialog>
  );
};

interface Props extends AssetsTransferProps {
  open: boolean;
}

const AssetTransferPopup = React.memo(_AssetTransferPopup);
export default AssetTransferPopup;
