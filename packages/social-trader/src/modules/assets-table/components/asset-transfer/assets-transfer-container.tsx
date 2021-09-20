import {
  InternalTransferRequest,
  InternalTransferRequestType,
  CoinsAsset
} from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import { updateWalletTimestampAction } from "pages/wallet/actions/wallet.actions";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postponeCallback } from "utils/hook-form.helpers";

import AssetsTransferForm from "modules/assets-table/components/asset-transfer/assets-transfer-form";
import { transferCoins } from "modules/assets-table/services/assets-table.service";

export interface AssetsTransferProps {
  onApply?: VoidFunction;
  onClose?: VoidFunction;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  title?: string;
  successMessage?: string;
  currentAsset: CoinsAsset;
}

const _AssetsTransferContainer: React.FC<AssetsTransferProps> = ({
  currentAsset,
  onApply,
  title,
  sourceType,
  destinationType,
  successMessage,
  onClose
}) => {
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
    request: transferCoins
  });
  const handleSubmit = useCallback(
    (values: InternalTransferRequest) => {
      const sourceId = sourceType === 'CoinsMarket' ? currentAsset.id : values.sourceId;
      const destinationId = destinationType === 'Wallet' ? values.sourceId : currentAsset.id;

      return sendTransferRequest({ ...values, destinationType, sourceType, sourceId, destinationId})
    },
    [destinationType, sourceType, currentAsset.id]
  );
  const currentItem = wallets[0];

  return (
    <AssetsTransferForm
      updateWallets={updateWalletMiddleware}
      sourceItems={wallets}
      title={title}
      currentItemId={currentItem.id}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      asset={currentAsset}
    />
  );
};

const AssetsTransferContainer = React.memo(_AssetsTransferContainer);
export default AssetsTransferContainer;
