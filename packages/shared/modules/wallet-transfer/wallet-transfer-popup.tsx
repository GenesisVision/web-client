import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletTransferContainer, {
  IWalletTransferContainerOwnProps
} from "./components/wallet-transfer-container";
import {
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "./wallet-transfer.types";

const _WalletTransferPopup: React.FC<Props> = ({
  currentItemContainer = TRANSFER_CONTAINER.SOURCE,
  sourceType = TRANSFER_DIRECTION.WALLET,
  destinationType = TRANSFER_DIRECTION.WALLET,
  currentItem,
  onClose,
  open
}) => (
  <Dialog open={open} onClose={onClose}>
    <WalletTransferContainer
      currentItemContainer={currentItemContainer}
      currentItem={currentItem}
      onClose={onClose}
      sourceType={sourceType}
      destinationType={destinationType}
    />
  </Dialog>
);

interface Props extends IWalletTransferContainerOwnProps {
  open: boolean;
}

const WalletTransferPopup = React.memo(_WalletTransferPopup);
export default WalletTransferPopup;
