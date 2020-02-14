import { WalletItemType } from "components/wallet-select/wallet-select";
import Crashable from "decorators/crashable";
import {
  InternalTransferRequest,
  InternalTransferRequestType
} from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getTransferFormLoaderData } from "modules/transfer/components/transfer-form.helpers";
import { updateWalletTimestampAction } from "pages/wallet/actions/wallet.actions";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { getPostponedOnCallback } from "utils/hook-form.helpers";

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
  successMessage,
  singleCurrentItemContainer,
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
    dispatch(fetchWallets(currency));
    dispatch(updateWalletTimestampAction());
  };
  const onCloseMiddleware = getPostponedOnCallback(onClose);
  const { errorMessage, sendRequest: sendTransferRequest } = useApiRequest({
    successMessage,
    middleware: [updateWalletMiddleware, onCloseMiddleware],
    request: transferRequest
  });
  const handleSubmit = useCallback(
    (values: InternalTransferRequest) => sendTransferRequest(values),
    [destinationType, sourceType]
  );
  useEffect(() => {
    if (
      !singleCurrentItemContainer &&
      ((currentItemContainer === TRANSFER_CONTAINER.SOURCE &&
        sourceType !== "Wallet") ||
        (currentItemContainer === TRANSFER_CONTAINER.DESTINATION &&
          destinationType !== "Wallet"))
    )
      getTradingAccounts(currency);
  }, []);
  const currentItemContainerItems = useMemo(
    () => (singleCurrentItemContainer ? [currentItem] : undefined),
    [currentItem]
  );
  const sourceItems =
    currentItemContainer === TRANSFER_CONTAINER.SOURCE &&
    currentItemContainerItems
      ? currentItemContainerItems
      : sourceType === "Wallet"
      ? wallets
      : tradingAccounts;
  const destinationItems =
    currentItemContainer === TRANSFER_CONTAINER.DESTINATION &&
    currentItemContainerItems
      ? currentItemContainerItems
      : destinationType === "Wallet"
      ? wallets
      : tradingAccounts;
  useEffect(() => {
    if (!!sourceItems && !!destinationItems) {
      setItems({ sourceItems, destinationItems });
    }
  }, [sourceItems, destinationItems]);

  return (
    <TransferForm
      loaderData={getTransferFormLoaderData(currentItem, wallets)}
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
  successMessage?: string;
  singleCurrentItemContainer: boolean;
  onApply: VoidFunction;
  currentItem: WalletItemType;
  onClose: VoidFunction;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  title: string;
  currentItemContainer: TRANSFER_CONTAINER;
}

const TransferContainer = React.memo(Crashable(_TransferContainer));
export default TransferContainer;
