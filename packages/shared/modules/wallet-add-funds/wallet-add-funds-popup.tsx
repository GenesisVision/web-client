import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletAddFundsContainer from "./components/wallet-add-funds-container";
import { CurrentWallet } from "./components/wallet-add-funds-form";

interface IWalletAddFundsPopupProps {
  currentWallet: CurrentWallet;
  open: boolean;
  onClose(): void;
}

class WalletAddFundsPopup extends React.Component<IWalletAddFundsPopupProps> {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <WalletAddFundsContainer currentWallet={this.props.currentWallet} />
      </Dialog>
    );
  }
}

export default WalletAddFundsPopup;
