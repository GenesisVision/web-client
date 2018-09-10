import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import DashboardRoutes from "pages/dashboard/dashboard.routes";
import ManagerPage, {
  MANAGER_DETAILS_ROUTE_REGEXP
} from "pages/manager/manager.page";
import NotFoundPage from "pages/not-found/not-found.routes";
import PrivateRoute from "pages/private-route";
import WalletPage, { WALLET_PAGE_ROUTE } from "pages/wallet/wallet-page";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import GlobalSearchPage from "../global-search/global-search.page";
import { GLOBAL_SEARCH_ROUTE } from "../global-search/global-search.routes";
import ProgramsRoutes, { PROGRAMS_ROUTE } from "../programs/programs.routes";
import AppLayout from "./components/app-layout/app-layout";

export const HOME_ROUTE = "/";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Switch>
        <Redirect exact from={HOME_ROUTE} to={PROGRAMS_ROUTE} />
        <Route path={PROGRAMS_ROUTE} component={ProgramsRoutes} />
        <Route path={GLOBAL_SEARCH_ROUTE} component={GlobalSearchPage} />
        <Route path={MANAGER_DETAILS_ROUTE_REGEXP} component={ManagerPage} />
        <PrivateRoute path={DASHBOARD_ROUTE} component={DashboardRoutes} />
        <PrivateRoute path={WALLET_PAGE_ROUTE} component={WalletPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppLayout>
  );
};

export default AppRoutes;
