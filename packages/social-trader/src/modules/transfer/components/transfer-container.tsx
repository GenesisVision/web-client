import { WalletItemType } from "components/wallet-select/wallet-select";
import { updateWalletTimestampAction } from "components/wallet/actions/wallet.actions";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "components/wallet/services/wallet.services";
import { InternalTransferRequestType } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import {
  getTransferFormLoaderData,
  TransferFormValues
} from "modules/transfer/components/transfer-form.helpers";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import {
  fetchTradingAccounts,
  transferRequest
} from "../services/transfer.services";
import {
  TRANSFER_CONTAINER,
  TransferFormItemsType,
  TransferItemType
} from "../transfer.types";
import TransferForm from "./transfer-form";

const _TransferContainer: React.FC<Props> = ({
  onApply,
  title,
  currentItem,
  sourceType,
  destinationType,
  currentItemContainer,
  onClose
}) => {
  const [items, setItems] = useState<TransferFormItemsType | undefined>(
    undefined
  );
  const {
    sendRequest: getTradingAccounts,
    data: tradingAccounts
  } = useApiRequest<TransferItemType[]>({
    request: fetchTradingAccounts
  });
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const currency = useSelector(currencySelector);
  const updateWalletMiddleware = () => {
    onApply && onApply();
    onClose();
    dispatch(fetchWallets(currency));
    dispatch(updateWalletTimestampAction());
  };
  const { errorMessage, sendRequest: sendTransferRequest } = useApiRequest({
    middleware: [updateWalletMiddleware],
    request: transferRequest
  });
  const handleSubmit = useCallback(
    (values: TransferFormValues) => sendTransferRequest(values),
    [destinationType, sourceType]
  );
  const sourceItems = sourceType === "Wallet" ? wallets : tradingAccounts;
  const destinationItems =
    destinationType === "Wallet" ? wallets : tradingAccounts;
  useEffect(() => {
    if (destinationType !== "Wallet" || sourceType !== "Wallet")
      getTradingAccounts();
  }, []);
  useEffect(() => {
    if (!!sourceItems && !!destinationItems)
      setItems({ sourceItems, destinationItems });
  }, [sourceItems, destinationItems]);
  return (
    <TransferForm
      loaderData={getTransferFormLoaderData(currentItem)}
      data={items!}
      sourceType={sourceType}
      destinationType={destinationType}
      title={title}
      currentItemContainer={currentItemContainer}
      currentItem={currentItem}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    />
  );
};

interface Props {
  onApply?: VoidFunction;
  currentItem: WalletItemType;
  onClose: () => void;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

const TransferContainer = React.memo(_TransferContainer);
export default TransferContainer;
