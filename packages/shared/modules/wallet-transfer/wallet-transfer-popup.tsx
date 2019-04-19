import { WalletData } from "gv-api-web";
import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletTransferContainer from "./components/wallet-transfer-container";

const WalletTransferPopup: React.FC<Props> = ({
  currentWallet,
  onClose,
  open
}) => (
  <Dialog open={open} onClose={onClose}>
    <WalletTransferContainer currentWallet={currentWallet} onClose={onClose} />
  </Dialog>
);

interface Props {
  currentWallet: WalletData;
  open: boolean;
  onClose: () => void;
}

export default React.memo(WalletTransferPopup);
