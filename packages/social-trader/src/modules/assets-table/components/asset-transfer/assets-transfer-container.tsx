import { CoinsAsset, InternalTransferRequest } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import AssetsBuyForm from "modules/assets-table/components/asset-transfer/assets-buy-form";
import AssetsSellForm from "modules/assets-table/components/asset-transfer/assets-sell-form";
import { transferCoins } from "modules/assets-table/services/assets-table.service";
import { updateWalletTimestampAction } from "pages/wallet/actions/wallet.actions";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postponeCallback } from "utils/hook-form.helpers";

export interface AssetsTransferProps {
  onApply?: VoidFunction;
  onClose?: VoidFunction;
  coinsId: string;
  successMessage?: string;
  currentAsset: CoinsAsset;
  isSell?: boolean;
}

const _AssetsTransferContainer: React.FC<AssetsTransferProps> = ({
  currentAsset,
  coinsId,
  onApply,
  successMessage,
  onClose,
  isSell
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
    (values: InternalTransferRequest) => sendTransferRequest(values),
    []
  );
  const currentItem = wallets[0];

  return isSell ? (
    <AssetsSellForm
      updateWallets={updateWalletMiddleware}
      wallets={wallets}
      coinsId={coinsId}
      sourceType={"CoinsMarket"}
      destinationType={"Wallet"}
      walletId={currentItem.id}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      asset={currentAsset}
    />
  ) : (
    <AssetsBuyForm
      updateWallets={updateWalletMiddleware}
      wallets={wallets}
      walletId={currentItem.id}
      sourceType={"Wallet"}
      destinationType={"CoinsMarket"}
      coinsId={coinsId}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      asset={currentAsset}
    />
  );
};

const AssetsTransferContainer = React.memo(_AssetsTransferContainer);
export default AssetsTransferContainer;
