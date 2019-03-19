import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestamp } from "shared/components/wallet/actions/wallet.actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { walletTransferRequest } from "shared/modules/wallet-withdraw/services/wallet-withdraw.services";
import RootState from "shared/reducers/root-reducer";

import WalletTransferForm, {
  TransferFormValuesType
} from "./wallet-transfer-form";

interface StateProps {
  wallets: WalletData[];
}

interface DispatchProps {
  service: {
    walletTransferRequest(props: TransferFormValuesType): Promise<any>;
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

  handleSubmit = (values: TransferFormValuesType) => {
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
    const { currentWallet, wallets } = this.props;
    if (!wallets.length) return <DialogLoader />;

    return (
      <WalletTransferForm
        wallets={wallets}
        currentWallet={currentWallet}
        disabled={this.state.isPending}
        errorMessage={this.state.errorMessage}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  if (!state.accountSettings) return { wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  return { wallets };
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
