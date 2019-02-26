import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import RootState from "shared/reducers/root-reducer";
import replaceParams from "shared/utils/replace-params";

import WalletCurrency from "./components/wallet-currency";
import WalletTotal from "./components/wallet-total";
import {
  fetchWalletTransactionsFilters,
  fetchWallets
} from "./services/wallet.services";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";
export const CURRENCY_SLUG = "currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/:${CURRENCY_SLUG}`;

export const composeWalletCurrencyUrl = (url: string): string =>
  replaceParams(WALLET_CURRENCY_PAGE_ROUTE, {
    [`:${CURRENCY_SLUG}`]: url
  });

interface IWalletDispatchToProps {
  fetchWallets(): void;
  fetchWalletTransactionsFilters(): void;
}

class WalletRoutes extends React.Component<IWalletDispatchToProps, any> {
  getWallets = () => {
    this.props.fetchWallets();
    this.props.fetchWalletTransactionsFilters();
  };

  componentDidMount() {
    this.getWallets();
  }

  render() {
    return (
      <Switch>
        <Route exact path={WALLET_TOTAL_PAGE_ROUTE} component={WalletTotal} />
        <Route path={WALLET_CURRENCY_PAGE_ROUTE} component={WalletCurrency} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default connect(
  undefined,
  { fetchWallets, fetchWalletTransactionsFilters }
)(WalletRoutes);
