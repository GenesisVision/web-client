import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ProgramsFacetContainer from "../../modules/programs/components/programs-facet/programs-facet-container";
import NotFoundPage from "../not-found/not-found";
import Programs from "./programs";

export const PROGRAMS_ROUTE = "/programs";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/facet/:facet`;
export const PROGRAMS_FACET_ROUTE_REGEX = `${PROGRAMS_ROUTE}/facet/:facet([0-9])`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
export const PROGRAMS_TAB_ROUTE_REGEX = `${PROGRAMS_ROUTE}/:tab(explore|favorites)`;

const ProgramsRoutes = () => (
  <Switch>
    <Route path={PROGRAMS_TAB_ROUTE_REGEX} component={Programs} />
    <Route
      path={PROGRAMS_FACET_ROUTE_REGEX}
      component={ProgramsFacetContainer}
    />
    <Redirect exact from={PROGRAMS_ROUTE} to={`${PROGRAMS_ROUTE}/explore`} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default ProgramsRoutes;
