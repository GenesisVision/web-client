import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import FollowForm from "./follow-popup/follow-popup-form";
import FollowTop from "./follow-popup/follow-popup-top";

class ProgramFollowContainer extends Component {
  state = {
    isPending: false,
    walletsAddresses: null
  };

  componentDidMount() {
    this.setState({ isPending: true });
    walletApi
      .v10WalletAddressesGet(authService.getAuthArg())
      .then(wallets =>
        this.setState({ walletsAddresses: wallets.wallets, isPending: false })
      );
  }

  render() {
    const { wallets, open, onClose, currency } = this.props;
    const { isPending, walletsAddresses } = this.state;
    if (!walletsAddresses || isPending) return null;
    const handleClose = () => {
      onClose();
    };
    return (
      <Dialog open={open} onClose={handleClose}>
        <FollowTop />
        <FollowForm
          walletsAddresses={walletsAddresses}
          currency={currency}
          wallets={wallets}
          copytradingAccount={""}
        />
      </Dialog>
    );
  }
}

ProgramFollowContainer.propTypes = {};

const mapStateToProps = state => {
  const { programDeposit, wallet } = state;
  return {
    wallets: wallet.info.data ? wallet.info.data.wallets : null,
    info: programDeposit.info,
    submitInfo: programDeposit.submit
  };
};

export default connect(mapStateToProps)(ProgramFollowContainer);
