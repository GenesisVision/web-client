import * as React from "react";
import Dialog from "shared/components/dialog/dialog";

import WalletConvertContainer, {
  CurrentWallet
} from "./components/wallet-convert-container";

interface IWalletAddFundsPopupProps {
  currentWallet: CurrentWallet;
  open: boolean;
  onClose(): void;
}

class WalletConvertPopup extends React.Component<IWalletAddFundsPopupProps> {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <WalletConvertContainer currentWallet={this.props.currentWallet} />
      </Dialog>
    );
  }
}

export default WalletConvertPopup;
