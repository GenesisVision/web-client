import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import PrivateRoute from "shared/components/private-route/private-route";
import ProgramsFacetPage from "shared/components/programs/programs-facet/programs-facet.page";

import ProgramDetailsPage from "./program-details/program-details.page";
import ProgramsRatingPage from "./programs-rating/programs-rating.page";
import ProgramsPage from "./programs/programs.page";
import {
  PROGRAM_DETAILS_ROUTE_REGEX,
  PROGRAMS_FACET_ROUTE_REGEX,
  PROGRAMS_FAVORITES_TAB_ROUTE,
  PROGRAMS_RATING_ROUTE,
  PROGRAMS_ROUTE
} from "shared/routes/programs.routes";

const ProgramsRoutes: React.FC = () => (
  <Switch>
    <Route exact path={PROGRAMS_ROUTE} component={ProgramsPage} />
    <PrivateRoute
      path={PROGRAMS_FAVORITES_TAB_ROUTE}
      component={ProgramsPage}
    />
    <Route path={PROGRAMS_RATING_ROUTE} component={ProgramsRatingPage} />
    <Route path={PROGRAMS_FACET_ROUTE_REGEX} component={ProgramsFacetPage} />
    <Route path={PROGRAM_DETAILS_ROUTE_REGEX} component={ProgramDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default ProgramsRoutes;
