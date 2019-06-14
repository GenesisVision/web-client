import { WalletData, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import NotFoundPage from "shared/components/not-found/not-found";
import { RootState } from "shared/reducers/root-reducer";

import { walletSelector as walletDataSelector } from "../reducers/wallet.reducers";
import { WalletRouteProps } from "../wallet.routes";
import WalletContainerLoader from "./wallet-balance/wallet-container-loader";
import WalletCurrency from "./wallet-currency";

const _WalletCurrencyContainer: React.FC<Props> = ({ info, isPending }) => (
  <WalletCurrency
    condition={!isPending && !!info}
    loader={!info && !isPending ? <NotFoundPage /> : <WalletContainerLoader />}
    info={info!}
  />
);

const walletSelector = createSelector<
  RootState,
  OwnProps,
  WalletMultiSummary | undefined,
  string,
  WalletData | undefined
>(
  (state: RootState) => walletDataSelector(state),
  (state: RootState, props: OwnProps) => props.match.params.currency,
  (data: WalletMultiSummary | undefined, currency: string) => {
    if (!data) return undefined;
    return data.wallets.find(
      (wallet: WalletData) => wallet.currency === currency.toUpperCase()
    );
  }
);

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => {
  const isPending = state.wallet.info.isPending;
  return {
    info: walletSelector(state, props),
    isPending
  };
};

interface Props extends InjectedTranslateProps, OwnProps, StateProps {}

interface OwnProps extends WalletRouteProps {}

interface StateProps {
  info?: WalletData;
  isPending: boolean;
}

const WalletCurrencyContainer = React.memo(
  connect(mapStateToProps)(_WalletCurrencyContainer)
);
export default WalletCurrencyContainer;
