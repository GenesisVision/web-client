import * as React from "react";
import { Route, Switch } from "react-router-dom";
import FundsFacetPage from "shared/components/funds/funds-facet/funds-facet.page";
import {
  FUNDS_FACET_ROUTE_REGEX,
  FUNDS_FAVORITES_TAB_ROUTE,
  FUNDS_ROUTE,
  FUND_DETAILS_ROUTE_REGEX
} from "shared/components/funds/funds.routes";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import PrivateRoute from "shared/components/private-route/private-route";

import FundDetailsPage from "./fund-details/fund-details.page";
import FundsPage from "./funds/funds.page";

const FundsRoutes: React.FC = () => (
  <Switch>
    <Route exact path={FUNDS_ROUTE} component={FundsPage} />
    <PrivateRoute path={FUNDS_FAVORITES_TAB_ROUTE} component={FundsPage} />
    <Route path={FUNDS_FACET_ROUTE_REGEX} component={FundsFacetPage} />
    <Route path={FUND_DETAILS_ROUTE_REGEX} component={FundDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default FundsRoutes;
