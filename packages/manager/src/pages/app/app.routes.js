import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import createFundPage from "pages/create-fund/create-fund.page";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.constants";
import createProgramPage from "pages/create-program/create-program.page";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import DashboardRoutes from "pages/dashboard/dashboard.routes";
import ManagerPage, {
  MANAGER_DETAILS_ROUTE_REGEXP
} from "pages/manager/manager.page";
import PrivateRoute from "pages/private-route";
import ProfileRoutes from "pages/profile/profile.routes";
import ProgramsRoutes, { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import WalletWithdrawConfirmPage, {
  WALLET_WITHDRAW_CONFIRM_ROUTE
} from "pages/wallet-withdraw-confirm/wallet-withdraw-confirm.page";
import WalletPage, { WALLET_PAGE_ROUTE } from "pages/wallet/wallet-page";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GlobalSearchPage from "shared/components/global-search/global-search.page.js";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import { PROFILE_ROUTE } from "shared/components/profile/profile.constants";

import FundsRoutes, { FUNDS_ROUTE } from "../funds/funds.routes";
import { NOTIFICATIONS_ROUTE } from "../notifications/notifications.routes";
import NotificationRoutes from "../notifications/notifications.routes";
import AppLayout from "./components/app-layout/app-layout";

export const HOME_ROUTE = "/";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Switch>
        <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
        <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
        <Route path={GLOBAL_SEARCH_ROUTE} component={GlobalSearchPage} />
        <Route path={FUNDS_ROUTE} component={FundsRoutes} />
        <Route path={MANAGER_DETAILS_ROUTE_REGEXP} component={ManagerPage} />
        <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
        <Route
          path={WALLET_WITHDRAW_CONFIRM_ROUTE}
          component={WalletWithdrawConfirmPage}
        />
        <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
        <PrivateRoute
          path={CREATE_PROGRAM_PAGE_ROUTE}
          component={createProgramPage}
        />
        <PrivateRoute
          path={CREATE_FUND_PAGE_ROUTE}
          component={createFundPage}
        />
        <PrivateRoute
          path={NOTIFICATIONS_ROUTE}
          component={NotificationRoutes}
        />
        <PrivateRoute path={WALLET_PAGE_ROUTE} component={WalletPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppLayout>
  );
};

export default AppRoutes;
