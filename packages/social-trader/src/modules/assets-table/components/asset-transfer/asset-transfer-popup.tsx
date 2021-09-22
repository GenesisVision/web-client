import Dialog from "components/dialog/dialog";
import dynamic from "next/dynamic";
import * as React from "react";

import { AssetsTransferProps } from "modules/assets-table/components/asset-transfer/assets-transfer-container";

const AssetsTransferContainer = dynamic(
  () => import("./assets-transfer-container")
);

const _AssetTransferPopup: React.FC<Props> = ({
  currentAsset,
  idCoins,
  onClose,
  open,
  title,
  sourceType,
  destinationType,
  onApply
}) => {
  return (
    <Dialog open={open} onClose={onClose!}>
      <AssetsTransferContainer
        title={title}
        onClose={onClose}
        sourceType={sourceType}
        destinationType={destinationType}
        currentAsset={currentAsset}
        idCoins={idCoins}
        onApply={onApply}
      />
    </Dialog>
  );
};

interface Props extends AssetsTransferProps {
  open: boolean;
}

const AssetTransferPopup = React.memo(_AssetTransferPopup);
export default AssetTransferPopup;
