import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestamp } from "shared/components/wallet/actions/wallet.actions";
import {
  fetchCopytradingAccounts,
  fetchWallets
} from "shared/components/wallet/services/wallet.services";
import RootState from "shared/reducers/root-reducer";

import { walletTransferRequest } from "../services/wallet-transfer.services";
import WalletTransferForm, {
  TransferFormValuesType
} from "./wallet-transfer-form";

class WalletTransferContainer extends React.Component<
  StateProps & DispatchProps & OwnProps,
  State
> {
  state = {
    errorMessage: undefined,
    copytradingAccounts: undefined
  };

  handleSubmit = (values: TransferFormValuesType) => {
    walletTransferRequest({ ...values })
      .then(() => {
        this.props.onClose();
        this.props.service.fetchWallets();
        this.props.service.updateWalletTimestamp();
        return fetchCopytradingAccounts();
      })
      .then(res => {
        this.setState({ copytradingAccounts: res.items });
      })
      .catch((error: any) => {
        this.setState({
          errorMessage: error.errorMessage
        });
      });
  };

  render() {
    const { currentWallet, wallets } = this.props;
    const { copytradingAccounts, errorMessage } = this.state;
    if (!wallets.length || !copytradingAccounts) return <DialogLoader />;

    return (
      <WalletTransferForm
        copytradingAccounts={copytradingAccounts}
        wallets={wallets}
        currentWallet={currentWallet}
        errorMessage={errorMessage}
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      walletTransferRequest,
      fetchWallets,
      updateWalletTimestamp
    },
    dispatch
  )
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(WalletTransferContainer);

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

interface State {
  copytradingAccounts?: CopyTradingAccountInfo[];
  errorMessage?: string;
}
