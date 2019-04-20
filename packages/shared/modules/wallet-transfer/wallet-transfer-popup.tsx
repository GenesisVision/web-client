import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletTransferContainer, {
  IWalletTransferContainerOwnProps
} from "./components/wallet-transfer-container";

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

export enum TRANSFER_DIRECTION {
  WALLET = "Wallet",
  COPYTRADING_ACCOUNT = "CopyTradingAccount"
}

export enum TRANSFER_CONTAINER {
  SOURCE = "SOURCE",
  DESTINATION = "DESTINATION"
}

const WalletTransferPopup = React.memo(_WalletTransferPopup);
export default WalletTransferPopup;
