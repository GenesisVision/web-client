import { WalletMultiSummary } from "gv-api-web";
import { IState } from "investor-web-portal/src/reducers";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import { walletApi } from "shared/services/api-client/wallet-api";
import replaceParams from "shared/utils/replace-params";

import authService from "../../services/auth-service";
import WalletCurrencyPage from "./wallet-page";
import WalletTotalPage from "./wallet-total-page";

export const WALLET_PAGE_ROUTE = "/wallet";
export const CURRENCY_SLUG = "currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_PAGE_ROUTE}/:${CURRENCY_SLUG}`;

export const composeWalletCurrencytUrl = (url: string): string =>
  replaceParams(WALLET_CURRENCY_PAGE_ROUTE, {
    [`:${CURRENCY_SLUG}`]: url
  });

class WalletRoutes extends React.Component<any, any> {
  state = {
    isPending: false,
    info: null
  };

  getWallets = () => {
    const currency = this.props.currency;
    this.setState({ isPending: true });
    walletApi
      .v10WalletMultiByCurrencyGet(currency, authService.getAuthArg())
      .then(
        (info: WalletMultiSummary): any => {
          this.setState({ info, isPending: false });
        }
      );
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
        <Route
          exact
          path={WALLET_PAGE_ROUTE}
          route={() => (
            <WalletTotalPage
              isPending={this.state.isPending}
              info={this.state.info}
            />
          )}
        />
        <Route
          path={WALLET_CURRENCY_PAGE_ROUTE}
          component={WalletCurrencyPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currency: state.accountSettings.currency
});

export default connect(mapStateToProps)(WalletRoutes);
