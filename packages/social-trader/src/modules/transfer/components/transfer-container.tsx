import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { updateWalletTimestampAction } from "components/wallet/actions/wallet.actions";
import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "components/wallet/services/wallet.services";
import { InternalTransferRequestType } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getPrivateAssetsForTransfer } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import { transferRequest } from "../services/transfer.services";
import { TRANSFER_CONTAINER, TransferItemType } from "../transfer.types";
import TransferForm, { TransferFormValues } from "./transfer-form";

const _TransferContainer: React.FC<Props> = ({
  onApply,
  title,
  currentItem,
  sourceType,
  destinationType,
  currentItemContainer,
  onClose
}) => {
  const {
    sendRequest: getTradingAccounts,
    data: tradingAccounts
  } = useApiRequest<TransferItemType[]>({
    request: getPrivateAssetsForTransfer
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
  return (
    <TransferForm
      condition={!!sourceItems && !!destinationItems}
      loader={<DialogLoader />}
      sourceType={sourceType}
      destinationType={destinationType}
      title={title}
      currentItemContainer={currentItemContainer}
      sourceItems={sourceItems!}
      destinationItems={destinationItems!}
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
