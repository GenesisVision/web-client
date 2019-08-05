import { WalletData } from "gv-api-web";
import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletAddFundsContainer from "./components/wallet-add-funds-container";

const WalletAddFundsPopup: React.FC<Props> = ({
  onClose,
  currentWallet,
  open
}) => (
  <Dialog open={open} onClose={onClose}>
    <WalletAddFundsContainer currentWallet={currentWallet} />
  </Dialog>
);

interface Props {
  currentWallet: WalletData;
  open: boolean;
  onClose(): void;
}

export default React.memo(WalletAddFundsPopup);
