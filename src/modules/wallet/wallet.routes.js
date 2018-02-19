import { Route, Switch } from "react-router-dom";
import React from "react";

import WalletContainer from "./components/wallet-container/wallet-container";
import WalletDeposit from "./components/wallet-deposit/wallet-deposit";

import { WALLET_ROUTE, WALLET_DEPOSIT_ROUTE } from "./wallet.constants";

const WalletRoutes = () => (
  <Switch>
    <Route exact path={WALLET_ROUTE} component={WalletContainer} />
    <Route path={WALLET_DEPOSIT_ROUTE} component={WalletDeposit} />
  </Switch>
);

export default WalletRoutes;
