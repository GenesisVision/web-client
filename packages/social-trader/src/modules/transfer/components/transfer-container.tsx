import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import { ItemType } from "components/wallet-select/wallet-select";
import { updateWalletTimestampAction } from "components/wallet/actions/wallet.actions";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import {
  fetchAccounts,
  fetchWallets
} from "components/wallet/services/wallet.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import { transferRequest } from "../services/transfer.services";
import { TRANSFER_CONTAINER, TRANSFER_DIRECTION } from "../transfer.types";
import TransferForm, { TransferFormValues } from "./transfer-form";

const _TransferContainer: React.FC<Props> = ({
  title,
  currentItem,
  sourceType,
  destinationType,
  currentItemContainer,
  onClose
}) => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const currency = useSelector(currencySelector);
  const { errorMessage, sendRequest: sendTransferRequest } = useApiRequest({
    request: transferRequest
  });
  useEffect(() => {
    if (
      destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT ||
      sourceType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT
    )
      dispatch(fetchAccounts());
  }, []);
  const handleSubmit = useCallback(
    (values: TransferFormValues) =>
      sendTransferRequest(values).then(() => {
        onClose();
        dispatch(fetchWallets(currency));
        dispatch(updateWalletTimestampAction());
        if (
          destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT ||
          sourceType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT
        )
          dispatch(fetchAccounts());
      }),
    [destinationType, sourceType]
  );
  const sourceItems = wallets;
  const destinationItems = wallets;
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

interface Props {
  currentItem: ItemType;
  onClose(): void;
  sourceType: any; // TODO declare type
  destinationType: any; // TODO declare type
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

const TransferContainer = React.memo(_TransferContainer);
export default TransferContainer;
