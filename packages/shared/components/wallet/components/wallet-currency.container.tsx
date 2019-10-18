import { WalletData, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { createSelector } from "reselect";
import NotFoundPage from "shared/components/not-found/not-found";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { walletSelector as walletDataSelector } from "../reducers/wallet.reducers";
import WalletCurrency from "./wallet-currency";
import WalletLoader from "./wallet-loader";

const _WalletCurrencyContainer: React.FC<Props> = ({ info, isPending }) => (
  <WalletCurrency
    condition={!isPending && !!info}
    loader={!info && !isPending ? <NotFoundPage /> : <WalletLoader />}
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
  (state: RootState, props: OwnProps) => props.currency,
  (data: WalletMultiSummary | undefined, currency: string) => {
    if (!data) return undefined;
    return data.wallets.find(
      (wallet: WalletData) => wallet.currency === currency.toUpperCase()
    );
  }
);

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
  info: walletSelector(state, props),
  isPending: state.wallet.info.isPending
});

interface Props extends WithTranslation, OwnProps, StateProps {}

interface OwnProps {
  currency: CurrencyEnum;
}

interface StateProps {
  info?: WalletData;
  isPending: boolean;
}

const WalletCurrencyContainer = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  React.memo
)(_WalletCurrencyContainer);
export default WalletCurrencyContainer;
