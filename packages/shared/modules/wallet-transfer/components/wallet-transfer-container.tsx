import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { updateWalletTimestamp } from "shared/components/wallet/actions/wallet.actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { walletTransferRequest } from "shared/modules/wallet-withdraw/services/wallet-withdraw.services";
import RootState from "shared/reducers/root-reducer";

import WalletTransferForm, { TransferFormValues } from "./wallet-transfer-form";

interface StateProps {
  wallets: WalletData[];
  twoFactorEnabled: boolean;
}

interface DispatchProps {
  service: {
    walletTransferRequest(props: TransferFormValues): Promise<any>;
    fetchWallets(): void;
    updateWalletTimestamp(): void;
  };
}

interface OwnProps {
  currentWallet: WalletData;
  onClose(): void;
}

interface Props extends StateProps, DispatchProps, OwnProps {}

interface State {
  isPending: boolean;
  errorMessage?: string;
}

class WalletTransferContainer extends React.Component<Props, State> {
  state = {
    isPending: false,
    errorMessage: undefined
  };

  handleSubmit = (values: TransferFormValues) => {
    this.setState({ isPending: true });
    walletTransferRequest({ ...values })
      .then(() => {
        this.setState({ isPending: false }, () => {
          this.props.onClose();
          this.props.service.fetchWallets();
          this.props.service.updateWalletTimestamp();
        });
      })
      .catch((error: any) => {
        this.setState({
          isPending: false,
          errorMessage: error.errorMessage
        });
      });
  };

  render() {
    const { twoFactorEnabled, currentWallet, wallets } = this.props;

    return (
      <WalletTransferForm
        wallets={wallets}
        currentWallet={currentWallet}
        disabled={this.state.isPending}
        errorMessage={this.state.errorMessage}
        onSubmit={this.handleSubmit}
        twoFactorEnabled={Boolean(twoFactorEnabled)}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  if (!state.accountSettings) return { twoFactorEnabled: false, wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled, wallets };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators(
    { walletTransferRequest, fetchWallets, updateWalletTimestamp },
    dispatch
  )
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(WalletTransferContainer);
