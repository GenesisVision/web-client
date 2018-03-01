import { Route, Switch } from "react-router-dom";
import React from "react";

import WalletDeposit from "./components/wallet-deposit/wallet-deposit";
import WalletWithdraw from "./components/wallet-withdraw/wallet-withdraw";
import Wallet from "./components/wallet/wallet";

import {
  WALLET_ROUTE,
  WALLET_DEPOSIT_ROUTE,
  WALLET_WITHDRAW_ROUTE
} from "./wallet.constants";

const WalletRoutes = () => (
  <Switch>
    <Route exact path={WALLET_ROUTE} component={Wallet} />
    <Route path={WALLET_DEPOSIT_ROUTE} component={WalletDeposit} />
    <Route path={WALLET_WITHDRAW_ROUTE} component={WalletWithdraw} />
  </Switch>
);

export default WalletRoutes;
