import * as React from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import signalApi from "shared/services/api-client/signal-api";

import FollowForm from "./follow-popup/follow-popup-form";
import FollowTop from "./follow-popup/follow-popup-top";
import { WalletData, WalletInfo, WalletsInfo } from "gv-api-web";

export interface IProgramFollowContainerProps {
  wallets: WalletData[];
  open: boolean;
  onClose: () => {};
  currency: string;
}
interface IProgramFollowContainerState {
  isPending: boolean;
  walletsAddresses: WalletInfo[] | null;
  signalAccounts: any | null;
}
class ProgramFollowContainer extends React.Component<
  IProgramFollowContainerProps,
  IProgramFollowContainerState
> {
  state = {
    isPending: false,
    walletsAddresses: null,
    signalAccounts: null
  };

  componentDidMount() {
    const auth = String(authService.getAuthArg());
    this.setState({ isPending: true });
    walletApi
      .v10WalletAddressesGet(auth)
      .then((wallets: WalletsInfo) => {
        this.setState({ walletsAddresses: wallets.wallets });
        return signalApi.v10SignalAccountsPost(auth);
      })
      .then((signalAccounts: any) => {
        this.setState({ signalAccounts, isPending: false });
      });
  }

  render() {
    const { wallets, open, onClose, currency } = this.props;
    const { isPending, walletsAddresses, signalAccounts } = this.state;
    if (!walletsAddresses || isPending) return null;
    const handleClose = () => {
      onClose();
    };
    return (
      <Dialog open={open} onClose={handleClose}>
        <FollowTop />
        <FollowForm
          walletsAddresses={walletsAddresses}
          signalAccounts={signalAccounts}
          currency={currency}
          wallets={wallets}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { programDeposit, wallet } = state;
  return {
    wallets: wallet.info.data ? wallet.info.data.wallets : null,
    info: programDeposit.info,
    submitInfo: programDeposit.submit
  };
};

export default connect(mapStateToProps)(ProgramFollowContainer);
