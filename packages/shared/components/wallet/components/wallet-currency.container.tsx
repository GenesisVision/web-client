import { WalletData, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import NotFoundPage from "shared/components/not-found/not-found";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { walletSelector as walletDataSelector } from "../reducers/wallet.reducers";
import { WalletRouteProps } from "../wallet.routes";
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
  WalletMultiSummary | undefined,
  string,
  WalletData | undefined
>(
  (state: RootState) => walletDataSelector(state),
  (state: RootState, props: Props) => props.currency,
  (data: WalletMultiSummary | undefined, currency: string) => {
    if (!data) return undefined;
    return data.wallets.find(
      (wallet: WalletData) => wallet.currency === currency.toUpperCase()
    );
  }
);

interface Props extends WalletRouteProps {}

const WalletCurrencyContainer = React.memo(_WalletCurrencyContainer);
export default WalletCurrencyContainer;
