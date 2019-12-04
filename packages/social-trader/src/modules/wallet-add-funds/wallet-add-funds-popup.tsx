import Dialog from "components/dialog/dialog";
import { WalletData } from "gv-api-web";
import * as React from "react";

import WalletAddFundsContainer from "./components/wallet-add-funds-container";

const _WalletAddFundsPopup: React.FC<Props> = ({
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
  onClose: () => void;
}

const WalletAddFundsPopup = React.memo(_WalletAddFundsPopup);
export default WalletAddFundsPopup;
