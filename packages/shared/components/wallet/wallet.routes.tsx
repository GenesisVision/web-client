import { IState } from "investor-web-portal/src/reducers";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import replaceParams from "shared/utils/replace-params";

import WalletCurrency from "./components/wallet-currency";
import WalletTotal from "./components/wallet-total";
import { fetchWallets } from "./services/wallet.services";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";
export const CURRENCY_SLUG = "currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/:${CURRENCY_SLUG}`;

export const composeWalletCurrencytUrl = (url: string): string =>
  replaceParams(WALLET_CURRENCY_PAGE_ROUTE, {
    [`:${CURRENCY_SLUG}`]: url
  });

interface IWalletDispatchToProps {
  fetchWallets(): void;
}

interface IWalletStateToProps {
  currency: string;
}

class WalletRoutes extends React.Component<
  IWalletDispatchToProps & IWalletStateToProps,
  any
> {
  getWallets = () => {
    this.props.fetchWallets();
  };

  componentDidMount() {
    this.getWallets();
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    if (prevProps.currency !== this.props.currency) {
      this.getWallets();
    }
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

const mapStateToProps = (state: IState) => ({
  currency: state.accountSettings.currency
});

export default connect(
  mapStateToProps,
  { fetchWallets }
)(WalletRoutes);
