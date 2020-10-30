import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  InternalTransferRequest,
  InternalTransferRequestType
} from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import { updateWalletTimestampAction } from "pages/wallet/actions/wallet.actions";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postponeCallback } from "utils/hook-form.helpers";

import { transferRequest } from "../services/transfer.services";
import {
  TRANSFER_CONTAINER,
  TransferFormItemsType,
  TransferItemType
} from "../transfer.types";
import TransferForm from "./transfer-form";

export interface TransferContainerProps {
  fixedSelects?: boolean;
  accountId?: string;
  outerCurrentItemContainerItems?: WalletItemType[];
  successMessage?: string;
  singleCurrentItemContainer?: boolean;
  onApply?: VoidFunction;
  currentItem: WalletItemType;
  onClose?: VoidFunction;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  title?: string;
  currentItemContainer: TRANSFER_CONTAINER;
}

const _TransferContainer: React.FC<TransferContainerProps> = ({
  fixedSelects,
  accountId,
  outerCurrentItemContainerItems,
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
  const tradingAccounts: TransferItemType[] = [];
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const currency = useAccountCurrency();
  const updateWalletMiddleware = () => {
    onApply && onApply();
    dispatch(fetchWallets(currency));
    dispatch(updateWalletTimestampAction());
  };
  const onCloseMiddleware = postponeCallback(onClose);
  const { errorMessage, sendRequest: sendTransferRequest } = useApiRequest({
    successMessage,
    middleware: [updateWalletMiddleware, onCloseMiddleware],
    request: transferRequest
  });
  const handleSubmit = useCallback(
    (values: InternalTransferRequest) => {
      const destinationId =
        destinationType === "ExchangeAccount"
          ? accountId
          : values.destinationId;
      const sourceId =
        sourceType === "ExchangeAccount" ? accountId : values.sourceId;
      return sendTransferRequest({ ...values, destinationId, sourceId });
    },
    [destinationType, sourceType, destinationType, accountId]
  );
  const currentItemContainerItems = useMemo(() => {
    if (outerCurrentItemContainerItems) return outerCurrentItemContainerItems;
    if (singleCurrentItemContainer) return [currentItem];
  }, [currentItem]);
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

  if (!items) return null;
  return (
    <TransferForm
      updateWallets={updateWalletMiddleware}
      fixedSelects={fixedSelects}
      data={items}
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

const TransferContainer = React.memo(_TransferContainer);
export default TransferContainer;
