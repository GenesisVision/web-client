import { WalletData } from "gv-api-web";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { walletTransferRequest } from "shared/modules/wallet-withdraw/services/wallet-withdraw.services";
import RootState from "shared/reducers/root-reducer";
import { DeepReadonly } from "utility-types";

import WalletTransferForm, {
  ITransferFormValues
} from "./wallet-transfer-form";

type IWalletTransferContainerStateToProps = DeepReadonly<{
  wallets: WalletData[];
  twoFactorEnabled: boolean;
}>;

interface IWalletTransferContainerDispatchToProps {
  service: {
    walletTransferRequest(props: ITransferFormValues): Promise<any>;
    fetchWallets(): void;
  };
}

type IWalletTransferContainerProps = IWalletTransferContainerStateToProps &
  IWalletTransferContainerDispatchToProps &
  DeepReadonly<{
    currentWallet: WalletData;
    onClose(): void;
  }>;

interface IWalletTransferContainerState {
  isPending: boolean;
  errorMessage?: string;
}

class WalletTransferContainer extends Component<
  IWalletTransferContainerProps,
  IWalletTransferContainerState
> {
  state = {
    isPending: false,
    errorMessage: undefined
  };

  handleSubmit = (values: ITransferFormValues) => {
    const { amount } = values;
    this.setState({ isPending: true });
    walletTransferRequest({
      sourceId: values.sourceId,
      destinationId: values.destinationId,
      amount
    })
      .then(() => {
        this.setState({ isPending: false }, () => this.props.onClose());
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
        twoFactorEnabled={twoFactorEnabled}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState
): IWalletTransferContainerStateToProps => {
  if (!state.accountSettings) return { twoFactorEnabled: false, wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled, wallets };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators({ walletTransferRequest, fetchWallets }, dispatch)
});

export default connect<
  IWalletTransferContainerStateToProps,
  IWalletTransferContainerDispatchToProps,
  IWalletTransferContainerProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(WalletTransferContainer);
