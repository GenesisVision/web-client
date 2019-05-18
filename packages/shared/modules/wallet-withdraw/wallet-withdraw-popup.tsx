import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import { CurrentWallet } from "../wallet-add-funds/components/wallet-add-funds-form";
import WalletWithdrawContainer from "./components/wallet-withdraw-container";

const WalletWithdrawPopup: React.FC<Props> = ({
  open,
  onClose,
  currentWallet
}) => (
  <Dialog open={open} onClose={onClose}>
    <WalletWithdrawContainer currentWallet={currentWallet} />
  </Dialog>
);

interface Props {
  currentWallet: CurrentWallet;
  open: boolean;
  onClose(): void;
}

export default WalletWithdrawPopup;
