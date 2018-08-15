import NotFoundPage from "pages/not-found/not-found.routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ProgramsFacetPage from "./programs-facet-page";
import ProgramsPage from "./programs-page";

export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "explore";

export const PROGRAMS_ROUTE = "/programs";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/facet/:facet`;
export const PROGRAMS_FACET_ROUTE_REGEX = `${PROGRAMS_ROUTE}/facet/:facet([0-9])`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
export const PROGRAMS_TAB_ROUTE_REGEX = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_EXPLORE_TAB_NAME}|${PROGRAMS_FAVORITES_TAB_NAME})`;

const ProgramsRoutes = () => (
  <Switch>
    <Route path={PROGRAMS_TAB_ROUTE_REGEX} component={ProgramsPage} />
    <Route path={PROGRAMS_FACET_ROUTE_REGEX} component={ProgramsFacetPage} />
    <Redirect
      exact
      from={PROGRAMS_ROUTE}
      to={`${PROGRAMS_ROUTE}/${PROGRAMS_EXPLORE_TAB_NAME}`}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default ProgramsRoutes;
