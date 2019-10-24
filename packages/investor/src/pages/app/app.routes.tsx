import DashboardRoutes from "pages/dashboard/dashboard.routes";
import ProfileRoutes from "pages/profile/profile.routes";
import ProgramsRoutes from "pages/programs/programs.routes";
import WalletRoutes from "pages/wallet/wallet.routes";
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
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { FUNDS_ROUTE } from "shared/routes/funds.routes";
import { MANAGER_DETAILS_ROUTE_REGEXP } from "shared/routes/manager.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

import FundsRoutes from "../funds/funds.routes";

const AppRoutes: React.FC = () => (
  <AppLayout>
    <Switch>
      <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
      <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
      <Route path={FUNDS_ROUTE} component={FundsRoutes} />
      <Route path={GLOBAL_SEARCH_ROUTE} component={GlobalSearchPage} />
      <Route path={MANAGER_DETAILS_ROUTE_REGEXP} component={ManagerContainer} />
      <Route
        path={WALLET_WITHDRAW_CONFIRM_ROUTE}
        component={WalletWithdrawConfirmPage}
      />
      <PrivateRoute path={PROFILE_ROUTE} component={ProfileRoutes} />
      <PrivateRoute path={NOTIFICATIONS_ROUTE} component={NotificationRoutes} />
      <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
      <PrivateRoute path={WALLET_TOTAL_PAGE_ROUTE} component={WalletRoutes} />
      <Route component={NotFoundPage} />
    </Switch>
  </AppLayout>
);

export default AppRoutes;
