import * as React from "react";
import { Route, Switch } from "react-router-dom";
import fundsFacetPage from "shared/components/funds/funds-facet/funds-facet.page";
import FundsPage from "shared/components/funds/funds.page";
import NotFoundPage from "shared/components/not-found/not-found";
import PrivateRoute from "shared/components/private-route/private-route";
import {
  FUND_DETAILS_ROUTE_REGEX,
  FUND_SETTINGS_ROUTE,
  FUNDS_FACET_ROUTE_REGEX,
  FUNDS_FAVORITES_TAB_ROUTE,
  FUNDS_ROUTE
} from "shared/routes/funds.routes";

import FundDetailsPage from "./fund-details/fund-details.page";
import FundSettingsPage from "./fund-settings/fund-settings.page";

const FundsRoutes: React.FC = () => (
  <Switch>
    <Route exact path={FUNDS_ROUTE} component={FundsPage} />
    <PrivateRoute path={FUNDS_FAVORITES_TAB_ROUTE} component={FundsPage} />
    <Route path={FUNDS_FACET_ROUTE_REGEX} component={fundsFacetPage} />
    <Route path={FUND_SETTINGS_ROUTE} component={FundSettingsPage} />
    <Route path={FUND_DETAILS_ROUTE_REGEX} component={FundDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default FundsRoutes;
