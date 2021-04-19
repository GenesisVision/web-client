import NotFoundPage from "components/not-found/not-found";
import { WalletData, WalletSummary } from "gv-api-web";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";

import { walletSelector as walletDataSelector } from "../reducers/wallet.reducers";
import { walletDataCreator } from "./wallet-container-loader";
import WalletCurrency from "./wallet-currency";

const _WalletCurrencyContainer: React.FC<Props> = props => {
  const info = useSelector((state: RootState) => walletSelector(state, props));
  const isPending = useSelector(
    (state: RootState) => state.wallet.info.isPending
  );
  if (!info && !isPending) return <NotFoundPage />;
  return <WalletCurrency loaderData={walletDataCreator()} data={info!} />;
};

const walletSelector = createSelector<
  RootState,
  Props,
  WalletSummary | undefined,
  string,
  WalletData | undefined
>(
  (state: RootState) => walletDataSelector(state),
  (state: RootState, props: Props) => props.currency,
  (data: WalletSummary | undefined, currency: string) => {
    if (!data) return undefined;
    return data.wallets.find(
      (wallet: WalletData) =>
        wallet.currency.toUpperCase() === currency.toUpperCase()
    );
  }
);

interface Props {
  currency: string;
}

const WalletCurrencyContainer = React.memo(_WalletCurrencyContainer);
export default WalletCurrencyContainer;
