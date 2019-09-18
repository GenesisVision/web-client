import { InternalTransferRequestSourceTypeEnum } from "gv-api-web";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import useApiRequest from "shared/hooks/api-request.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";

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
  const copyTradingAccounts = useSelector(copyTradingAccountsSelector);
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

interface Props {
  currentItem: ItemType;
  onClose(): void;
  sourceType: InternalTransferRequestSourceTypeEnum;
  destinationType: InternalTransferRequestSourceTypeEnum;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

const TransferContainer = React.memo(_TransferContainer);
export default TransferContainer;
