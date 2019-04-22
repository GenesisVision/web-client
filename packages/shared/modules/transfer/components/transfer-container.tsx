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

import { transferRequest } from "../services/transfer.services";
import {
  ItemType,
  TRANSFER_CONTAINER,
  TRANSFER_DIRECTION
} from "../transfer.types";
import TransferForm, { TransferFormValuesType } from "./transfer-form";

class _TransferContainer extends React.Component<Props, State> {
  state = {
    errorMessage: undefined,
    copytradingAccounts: []
  };

  componentDidMount() {
    if (
      this.props.destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT ||
      this.props.sourceType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT
    )
      fetchCopytradingAccounts().then(res => {
        this.setState({ copytradingAccounts: res.items });
      });
  }

  handleSubmit = (values: TransferFormValuesType) => {
    const { sourceType, destinationType, service, onClose } = this.props;
    transferRequest({ ...values, sourceType, destinationType })
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
      title,
      currentItem,
      wallets,
      sourceType,
      destinationType,
      currentItemContainer
    } = this.props;
    const { copytradingAccounts, errorMessage } = this.state;
    const sourceItems =
      sourceType === TRANSFER_DIRECTION.WALLET ? wallets : copytradingAccounts;
    const destinationItems =
      destinationType === TRANSFER_DIRECTION.WALLET
        ? wallets
        : copytradingAccounts;
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
  if (!state.accountSettings) return { wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  return { wallets };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      walletTransferRequest: transferRequest,
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
}

interface DispatchProps {
  service: {
    walletTransferRequest(props: TransferFormValuesType): Promise<any>;
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
  copytradingAccounts?: CopyTradingAccountInfo[];
  errorMessage?: string;
}
