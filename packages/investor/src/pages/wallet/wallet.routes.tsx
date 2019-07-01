import * as React from "react";
import { Route, Switch } from "react-router";
import WalletRoutesCommon, {
  WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE,
  WALLET_TOTAL_PAGE_ROUTE
} from "shared/components/wallet/wallet.routes";

import WalletCopytradingAccountContainer from "./components/wallet-copytrading-account-container";

const WalletRoutes: React.FC = () => (
  <Switch>
    <Route
      path={WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE}
      component={WalletCopytradingAccountContainer}
    />
    <Route path={WALLET_TOTAL_PAGE_ROUTE} component={WalletRoutesCommon} />
  </Switch>
);

export default WalletRoutes;
