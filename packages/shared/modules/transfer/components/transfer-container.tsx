import {
  CopyTradingAccountInfo,
  InternalTransferRequestSourceTypeEnum,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestampAction } from "shared/components/wallet/actions/wallet.actions";
import {
  copyTradingAccountsSelector,
  walletsSelector
} from "shared/components/wallet/reducers/wallet.reducers";
import {
  fetchAccounts,
  fetchWallets
} from "shared/components/wallet/services/wallet.services";
import { RootState } from "shared/reducers/root-reducer";
import { ResponseError } from "shared/utils/types";

import { transferRequest } from "../services/transfer.services";
import {
  ItemType,
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "../transfer.types";
import TransferForm, { TransferFormValues } from "./transfer-form";

class _TransferContainer extends React.PureComponent<Props, State> {
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

  handleSubmit = (values: TransferFormValues) => {
    const { service, onClose, destinationType, sourceType } = this.props;
    transferRequest(values)
      .then(() => {
        onClose();
        service.fetchWallets();
        service.updateWalletTimestamp();
        if (
          destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT ||
          sourceType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT
        )
          service.fetchAccounts();
      })
      .catch((error: ResponseError) => {
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

const mapStateToProps = (state: RootState): StateProps => ({
  wallets: walletsSelector(state),
  copyTradingAccounts: copyTradingAccountsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      fetchAccounts,
      fetchWallets,
      updateWalletTimestamp: updateWalletTimestampAction
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
  sourceType: InternalTransferRequestSourceTypeEnum;
  destinationType: InternalTransferRequestSourceTypeEnum;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

interface State {
  errorMessage?: string;
}
