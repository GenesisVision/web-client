import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestamp } from "shared/components/wallet/actions/wallet.actions";
import {
  fetchAccounts,
  fetchWallets
} from "shared/components/wallet/services/wallet.services";
import RootState from "shared/reducers/root-reducer";

import { transferRequest } from "../services/transfer.services";
import {
  ItemType,
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "../transfer.types";
import TransferForm, { TransferFormValuesType } from "./transfer-form";

class _TransferContainer extends React.Component<Props, State> {
  state = {
    errorMessage: undefined
  };

  componentDidMount() {
    const { destinationType, sourceType, service } = this.props;
    if (
      destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT ||
      sourceType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT
    )
      service.fetchAccounts();
  }

  handleSubmit = (values: TransferFormValuesType) => {
    const { sourceType, destinationType, service, onClose } = this.props;
    transferRequest({ ...values, sourceType, destinationType })
      .then(() => {
        onClose();
        service.fetchWallets();
        service.fetchAccounts();
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
      copyTradingAccounts,
      title,
      currentItem,
      wallets,
      sourceType,
      destinationType,
      currentItemContainer
    } = this.props;
    const { errorMessage } = this.state;
    const sourceItems =
      sourceType === TRANSFER_DIRECTION.WALLET ? wallets : copyTradingAccounts;
    const destinationItems =
      destinationType === TRANSFER_DIRECTION.WALLET
        ? wallets
        : copyTradingAccounts;
    if (!sourceItems.length || !destinationItems.length)
      return <DialogLoader />;
    return (
      <TransferForm
        sourceType={sourceType}
        destinationType={destinationType}
        title={title}
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
  if (!state.accountSettings) return { wallets: [], copyTradingAccounts: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  const copyTradingAccounts = state.copyTradingAccounts.info.data
    ? state.copyTradingAccounts.info.data.accounts
    : [];
  return { wallets, copyTradingAccounts };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      fetchAccounts,
      fetchWallets,
      updateWalletTimestamp
    },
    dispatch
  )
});

const TransferContainer = connect<
  StateProps,
  DispatchProps,
  ITransferContainerOwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_TransferContainer);
export default TransferContainer;

interface Props extends StateProps, DispatchProps, ITransferContainerOwnProps {}

interface StateProps {
  wallets: WalletData[];
  copyTradingAccounts: CopyTradingAccountInfo[];
}

interface DispatchProps {
  service: {
    fetchAccounts(): void;
    fetchWallets(): void;
    updateWalletTimestamp(): void;
  };
}

export interface ITransferContainerOwnProps {
  currentItem: ItemType;
  onClose(): void;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
  sourceType?: TRANSFER_DIRECTION;
  destinationType?: TRANSFER_DIRECTION;
}

interface State {
  errorMessage?: string;
}
