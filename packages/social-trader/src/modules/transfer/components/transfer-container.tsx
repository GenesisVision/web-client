import { WalletItemType } from "components/wallet-select/wallet-select";
import {
  Currency,
  InternalMultiTransferRequest,
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

import {
  filterSupportedCurrenciesItems,
  transferMultiCurrencyRequest,
  transferRequest
} from "../services/transfer.services";
import {
  TRANSFER_CONTAINER,
  TransferFormItemsType,
  TransferItemType
} from "../transfer.types";
import { TRANSFER_TYPE } from "../transfer-button";
import TransferForm from "./transfer-form";

export interface TransferContainerProps {
  accountId?: string;
  isExchangeAccount?: boolean;
  transferType?: TRANSFER_TYPE;
  outerCurrentItemContainerItems?: WalletItemType[];
  successMessage?: string;
  singleCurrentItemContainer?: boolean;
  supportedCurrencies?: Currency[];
  onApply?: VoidFunction;
  currentItem: WalletItemType;
  onClose?: VoidFunction;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  title?: string;
  currentItemContainer: TRANSFER_CONTAINER;
}

const _TransferContainer: React.FC<TransferContainerProps> = ({
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
  onClose,
  isExchangeAccount,
  supportedCurrencies,
  transferType
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
    request: isExchangeAccount ? transferMultiCurrencyRequest : transferRequest
  });
  const handleSubmit = useCallback(
    (values: InternalMultiTransferRequest) => {
      const destinationId =
        destinationType === "ExchangeAccount"
          ? accountId
          : values.destinationId;
      const sourceId =
        sourceType === "ExchangeAccount" ? accountId : values.sourceId;
      const sourceCurrency = isExchangeAccount
        ? values.sourceCurrency
        : undefined;
      const destinationCurrency = isExchangeAccount
        ? values.destinationCurrency
        : undefined;
      return sendTransferRequest({
        ...values,
        destinationId,
        sourceId,
        sourceCurrency,
        destinationCurrency
      });
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
      setItems({
        sourceItems: filterSupportedCurrenciesItems({
          items: sourceItems,
          supportedCurrencies,
          isExchangeAccount,
          shouldFilter: transferType === TRANSFER_TYPE.WITHDRAW
        }),
        destinationItems: filterSupportedCurrenciesItems({
          items: destinationItems,
          supportedCurrencies,
          isExchangeAccount,
          shouldFilter: transferType === TRANSFER_TYPE.DEPOSIT
        })
      });
    }
  }, [sourceItems, destinationItems]);

  if (!items) return null;
  return (
    <TransferForm
      updateWallets={updateWalletMiddleware}
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
