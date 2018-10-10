import NotFoundPage from "pages/not-found/not-found.routes";
import React from "react";
import { Route, Switch } from "react-router-dom";

import { SLUG_URL_REGEXP } from "../../utils/constants";
import replaceParams from "../../utils/replace-params";
import PrivateRoute from "../private-route";
import FundsFacetPage from "./funds-facet/funds-facet.page";
import FundsPage from "./funds/funds.page";
import FundDetailsPage from "./fund-details/fund-details.page";

export const FUNDS_FAVORITES_TAB_NAME = "favorites";
export const FUNDS_EXPLORE_TAB_NAME = "";
export const FUNDS_SLUG_URL_PARAM_NAME = "fundsSlugUrl";

export const FUNDS_ROUTE = "/funds";
export const FUND_DETAILS_ROUTE = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const FUND_DETAILS_ROUTE_REGEX = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const FUNDS_FACET_ROUTE = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const FUNDS_FACET_ROUTE_REGEX = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
export const FUNDS_TAB_ROUTE = `${FUNDS_ROUTE}/:tab`;
export const FUNDS_EXPLORE_TAB_ROUTE = `${FUNDS_ROUTE}/:tab(${FUNDS_EXPLORE_TAB_NAME})`;
export const FUNDS_FAVORITES_TAB_ROUTE = `${FUNDS_ROUTE}/:tab(${FUNDS_FAVORITES_TAB_NAME})`;

export const composeFundsDetailsUrl = slugUrl =>
  replaceParams(FUND_DETAILS_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

const FundsRoutes = () => (
  <Switch>
    <Route exact path={FUNDS_ROUTE} component={FundsPage} />
    <PrivateRoute path={FUNDS_FAVORITES_TAB_ROUTE} component={FundsPage} />
    <Route path={FUNDS_FACET_ROUTE_REGEX} component={FundsFacetPage} />
    <Route path={FUND_DETAILS_ROUTE_REGEX} component={FundDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default FundsRoutes;
