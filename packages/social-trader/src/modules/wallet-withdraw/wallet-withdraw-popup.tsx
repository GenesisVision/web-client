import Dialog from "components/dialog/dialog";
import { WalletData } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";

const WalletWithdrawContainer = dynamic(() =>
  import("./components/wallet-withdraw-container")
);

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
  currentWallet: WalletData;
  open: boolean;
  onClose(): void;
}

const WalletWithdrawPopup = React.memo(_WalletWithdrawPopup);
export default WalletWithdrawPopup;
