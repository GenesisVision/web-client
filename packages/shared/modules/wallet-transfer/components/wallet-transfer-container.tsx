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
import {
  ItemType,
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "../wallet-transfer.types";
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
    const { sourceType, destinationType, service, onClose } = this.props;
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
    const {
      currentItem,
      wallets,
      sourceType,
      destinationType,
      currentItemContainer
    } = this.props;
    const { copytradingAccounts, errorMessage } = this.state;
    if (!wallets.length || !copytradingAccounts) return <DialogLoader />;
    const sourceItems =
      sourceType === TRANSFER_DIRECTION.WALLET ? wallets : copytradingAccounts;
    const destinationItems =
      destinationType === TRANSFER_DIRECTION.WALLET
        ? wallets
        : copytradingAccounts;
    return (
      <WalletTransferForm
        currentItemContainer={currentItemContainer}
        sourceItems={sourceItems}
        destinationItems={destinationItems}
        currentItem={currentItem}
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
  currentItem: ItemType;
  onClose(): void;
  currentItemContainer?: TRANSFER_CONTAINER;
  sourceType?: TRANSFER_DIRECTION;
  destinationType?: TRANSFER_DIRECTION;
}

interface State {
  copytradingAccounts?: CopyTradingAccountInfo[];
  errorMessage?: string;
}
