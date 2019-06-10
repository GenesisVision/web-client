import { WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import { connect } from "react-redux";
import NotFoundPage from "shared/components/not-found/not-found";
import { RootState } from "shared/reducers/root-reducer";

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

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => {
  const isPending = state.wallet.info.isPending;
  const { currency } = props.match.params;
  const info = state.wallet.info.data
    ? state.wallet.info.data.wallets.find(
        wallet => wallet.currency === currency.toUpperCase()
      )
    : undefined;
  return {
    info,
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
