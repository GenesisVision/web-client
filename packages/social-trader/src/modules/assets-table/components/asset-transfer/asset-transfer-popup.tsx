import Dialog from "components/dialog/dialog";
import dynamic from "next/dynamic";
import * as React from "react";
import { useTranslation } from "i18n";

import {
  AssetsTransferProps
} from "modules/assets-table/components/asset-transfer/assets-transfer-container";

const AssetsTransferContainer = dynamic(
  () => import("./assets-transfer-container")
);

const _AssetTransferPopup: React.FC<Props> = ({ currentAsset, onClose, open, title, sourceType, destinationType }) => {
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose!}>
      <AssetsTransferContainer
        title={title}
        onClose={onClose}
        sourceType={sourceType}
        destinationType={destinationType}
        currentAsset={currentAsset}
      />
    </Dialog>
  );
};

interface Props extends AssetsTransferProps {
  open: boolean;
}

const AssetTransferPopup = React.memo(_AssetTransferPopup);
export default AssetTransferPopup;