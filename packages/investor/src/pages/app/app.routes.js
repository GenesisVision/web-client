import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import DashboardRoutes from "pages/dashboard/dashboard.routes";
import ManagerPage, {
  MANAGER_DETAILS_ROUTE_REGEXP
} from "pages/manager/manager.page";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import NotificationRoutes, {
  NOTIFICATIONS_ROUTE
} from "pages/notifications/notifications.routes";
import PrivateRoute from "pages/private-route";
import { PROFILE_ROUTE } from "shared/components/profile/profile.constants";
import ProfileRoutes from "pages/profile/profile.routes";
import WalletWithdrawConfirmPage, {
  WALLET_WITHDRAW_CONFIRM_ROUTE
} from "pages/wallet-withdraw-confirm/wallet-withdraw-confirm.page";
import WalletPage, { WALLET_PAGE_ROUTE } from "pages/wallet/wallet-page";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GlobalSearchPage from "shared/components/global-search/global-search.page";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";

import FundsRoutes, { FUNDS_ROUTE } from "../funds/funds.routes";
import ProgramsRoutes, { PROGRAMS_ROUTE } from "../programs/programs.routes";
import AppLayout from "./components/app-layout/app-layout";

export const HOME_ROUTE = "/";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Switch>
        <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
        <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
        <Route path={FUNDS_ROUTE} component={FundsRoutes} />
        <Route path={GLOBAL_SEARCH_ROUTE} component={GlobalSearchPage} />
        <Route path={MANAGER_DETAILS_ROUTE_REGEXP} component={ManagerPage} />
        <Route
          path={WALLET_WITHDRAW_CONFIRM_ROUTE}
          component={WalletWithdrawConfirmPage}
        />
        <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
        <PrivateRoute
          path={NOTIFICATIONS_ROUTE}
          component={NotificationRoutes}
        />
        <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
        <PrivateRoute path={WALLET_PAGE_ROUTE} component={WalletPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppLayout>
  );
};

export default AppRoutes;
