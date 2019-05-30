import { MultiWalletFilters, WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import { connect } from "react-redux";
import NotFoundPage from "shared/components/not-found/not-found";
import RootState from "shared/reducers/root-reducer";

import { WalletRouteProps } from "../wallet.routes";
import WalletContainerLoader from "./wallet-balance/wallet-container-loader";
import WalletCurrency from "./wallet-currency";

const _WalletCurrencyContainer: React.FC<Props> = ({
  info,
  isPending,
  filters
}) => (
  <WalletCurrency
    condition={!isPending && !!info && !!filters}
    loader={!info && !isPending ? <NotFoundPage /> : <WalletContainerLoader />}
    info={info!}
    filters={filters!}
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
  const filters = state.platformData.data
    ? state.platformData.data.enums.multiWallet
    : undefined;
  return {
    info,
    isPending,
    filters
  };
};

interface Props extends InjectedTranslateProps, OwnProps, StateProps {}

interface OwnProps extends WalletRouteProps {}

interface StateProps {
  info?: WalletData;
  isPending: boolean;
  filters?: MultiWalletFilters;
}

const WalletCurrencyContainer = connect(mapStateToProps)(
  _WalletCurrencyContainer
);
export default WalletCurrencyContainer;
