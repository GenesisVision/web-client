import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import createFundPage from "pages/create-fund/create-fund.page";
import createProgramPage from "pages/create-program/create-program.page";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.routes";
import DashboardRoutes from "pages/dashboard/dashboard.routes";
import ProfileRoutes from "pages/profile/profile.routes";
import ProgramsRoutes from "pages/programs/programs.routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppLayout from "shared/components/app-layout/app-layout";
import GlobalSearchPage from "shared/components/global-search/global-search.page";
import { GLOBAL_SEARCH_ROUTE } from "shared/components/global-search/global-search.routes";
import ManagerContainer from "shared/components/manager/manager.container";
import NotFoundPage from "shared/components/not-found/not-found";
import NotificationRoutes, {
  NOTIFICATIONS_ROUTE
} from "shared/components/notifications/notifications.routes";
import PrivateRoute from "shared/components/private-route/private-route";
import { PROFILE_ROUTE } from "shared/components/profile/profile.constants";
import WalletWithdrawConfirmPage, {
  WALLET_WITHDRAW_CONFIRM_ROUTE
} from "shared/components/wallet-withdraw-confirm/wallet-withdraw-confirm.page";
import WalletTotalPage, {
  WALLET_TOTAL_PAGE_ROUTE
} from "shared/components/wallet/wallet.routes";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { FUNDS_ROUTE } from "shared/routes/funds.routes";
import { MANAGER_DETAILS_ROUTE_REGEXP } from "shared/routes/manager.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

import FundsRoutes from "../funds/funds.routes";

const AppRoutes = () => (
  <AppLayout>
    <Switch>
      <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
      <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
      <Route path={GLOBAL_SEARCH_ROUTE} component={GlobalSearchPage} />
      <Route path={FUNDS_ROUTE} component={FundsRoutes} />
      <Route path={MANAGER_DETAILS_ROUTE_REGEXP} component={ManagerContainer} />
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
      <PrivateRoute path={CREATE_FUND_PAGE_ROUTE} component={createFundPage} />
      <PrivateRoute path={NOTIFICATIONS_ROUTE} component={NotificationRoutes} />
      <PrivateRoute
        path={WALLET_TOTAL_PAGE_ROUTE}
        component={WalletTotalPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  </AppLayout>
);

export default AppRoutes;
