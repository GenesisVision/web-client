import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";

import { composeUrl } from "../../utils/compose-url";
import WalletCopytradingAccount from "./components/wallet-copytrading-account/wallet-copytrading-account";
import WalletCurrency from "./components/wallet-currency";
import WalletTotal from "./components/wallet-total";
import { fetchWallets } from "./services/wallet.services";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";
export const WALLET_COPYTRADING_PAGE_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/copytrading`;
export const CURRENCY_SLUG = "currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/:${CURRENCY_SLUG}`;
export const WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE = `${WALLET_COPYTRADING_PAGE_ROUTE}/:${CURRENCY_SLUG}`;

export const composeWalletCurrencyUrl = composeUrl(
  WALLET_CURRENCY_PAGE_ROUTE,
  CURRENCY_SLUG
);

export const composeWalletCopytradingCurrencyUrl = composeUrl(
  WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE,
  CURRENCY_SLUG
);

interface IWalletDispatchToProps {
  fetchWallets(): void;
}

class WalletRoutes extends React.Component<IWalletDispatchToProps, any> {
  componentDidMount() {
    this.props.fetchWallets();
  }

  render() {
    return (
      <Switch>
        <Route exact path={WALLET_TOTAL_PAGE_ROUTE} component={WalletTotal} />
        <Route
          path={WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE}
          component={WalletCopytradingAccount}
        />
        <Route path={WALLET_CURRENCY_PAGE_ROUTE} component={WalletCurrency} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default connect(
  undefined,
  { fetchWallets }
)(WalletRoutes);
