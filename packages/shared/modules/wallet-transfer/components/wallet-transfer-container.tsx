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
import { TRANSFER_DIRECTION } from "../wallet-transfer-popup";
import WalletTransferForm, {
  TransferFormValuesType
} from "./wallet-transfer-form";

class WalletTransferContainer extends React.Component<Props, State> {
  state = {
    errorMessage: undefined,
    copytradingAccounts: undefined
  };

  componentDidMount() {
    fetchCopytradingAccounts().then(res => {
      this.setState({ copytradingAccounts: res.items });
    });
  }

  handleSubmit = (values: TransferFormValuesType) => {
    const {
      sourceType = TRANSFER_DIRECTION.WALLET,
      destinationType = TRANSFER_DIRECTION.WALLET,
      service,
      onClose
    } = this.props;
    walletTransferRequest({ ...values, sourceType, destinationType })
      .then(() => {
        onClose();
        service.fetchWallets();
        service.updateWalletTimestamp();
      })
      .catch((error: any) => {
        this.setState({
          errorMessage: error.errorMessage
        });
      });
  };

  render() {
    const { currentWallet, wallets, sourceType, destinationType } = this.props;
    const { copytradingAccounts, errorMessage } = this.state;
    if (!wallets.length || !copytradingAccounts) return <DialogLoader />;

    return (
      <WalletTransferForm
        sourceType={sourceType}
        destinationType={destinationType}
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

export default connect<
  StateProps,
  DispatchProps,
  IWalletTransferContainerOwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(WalletTransferContainer);

interface Props
  extends StateProps,
    DispatchProps,
    IWalletTransferContainerOwnProps {}

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

export interface IWalletTransferContainerOwnProps {
  currentWallet: WalletData;
  onClose(): void;
  sourceType?: TRANSFER_DIRECTION;
  destinationType?: TRANSFER_DIRECTION;
}

interface State {
  copytradingAccounts?: CopyTradingAccountInfo[];
  errorMessage?: string;
}
