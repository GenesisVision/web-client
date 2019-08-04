import {
  CopyTradingAccountInfo,
  InternalTransferRequestSourceTypeEnum,
  WalletData
} from "gv-api-web";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { ItemType } from "shared/components/wallet-select/wallet-select";
import { updateWalletTimestampAction } from "shared/components/wallet/actions/wallet.actions";
import {
  copyTradingAccountsSelector,
  walletsSelector
} from "shared/components/wallet/reducers/wallet.reducers";
import {
  fetchAccounts,
  fetchWallets
} from "shared/components/wallet/services/wallet.services";
import useErrorMessage from "shared/hooks/error-message.hook";
import { RootState } from "shared/reducers/root-reducer";

import { transferRequest } from "../services/transfer.services";
import { TRANSFER_CONTAINER, TRANSFER_DIRECTION } from "../transfer.types";
import TransferForm, { TransferFormValues } from "./transfer-form";

const _TransferContainer: React.FC<Props> = ({
  copyTradingAccounts,
  title,
  currentItem,
  wallets,
  sourceType,
  destinationType,
  currentItemContainer,
  service,
  onClose
}) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  useEffect(() => {
    if (
      destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT ||
      sourceType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT
    )
      service.fetchAccounts();
  }, []);
  const handleSubmit = useCallback(
    (values: TransferFormValues) =>
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
        .catch(setErrorMessage),
    [destinationType, sourceType]
  );
  const sourceItems =
    sourceType === TRANSFER_DIRECTION.WALLET ? wallets : copyTradingAccounts;
  const destinationItems =
    destinationType === TRANSFER_DIRECTION.WALLET
      ? wallets
      : copyTradingAccounts;
  return (
    <TransferForm
      condition={!!sourceItems.length && !!destinationItems.length}
      loader={<DialogLoader />}
      sourceType={sourceType}
      destinationType={destinationType}
      title={title}
      currentItemContainer={currentItemContainer}
      sourceItems={sourceItems}
      destinationItems={destinationItems}
      currentItem={currentItem}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    />
  );
};

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

const TransferContainer = compose<
  React.ComponentType<ITransferContainerOwnProps>
>(
  connect<StateProps, DispatchProps, ITransferContainerOwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
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
