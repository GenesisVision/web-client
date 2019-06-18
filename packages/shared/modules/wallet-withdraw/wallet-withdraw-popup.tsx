import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import { CurrentWallet } from "../wallet-add-funds/components/wallet-add-funds-form";
import WalletWithdrawContainer from "./components/wallet-withdraw-container";

const _WalletWithdrawPopup: React.FC<Props> = ({
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

const WalletWithdrawPopup = React.memo(_WalletWithdrawPopup);
export default WalletWithdrawPopup;
