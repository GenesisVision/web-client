import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found";
import { Route, Redirect, Switch } from "react-router-dom";
import React from "react";

import Tournament from "./components/tournament";

import {
  TOURNAMENT_ROUTE,
  TOURNAMENT_ROUND_ROUTE
} from "./tournament.constants";
import replaceParams from "utils/replace-params";

const TournamentRoutes = ({ platformData }) => {
  const { data: platformSettings } = platformData;
  const isTournamentActive =
    platformSettings && platformSettings.isTournamentActive;
  if (!isTournamentActive) {
    return <Redirect to={NOT_FOUND_PAGE_ROUTE} />;
  }

  return (
    <Switch>
      <Redirect
        exact
        from={TOURNAMENT_ROUTE}
        to={replaceParams(TOURNAMENT_ROUND_ROUTE, {
          ":round": platformSettings.tournamentCurrentRound
        })}
      />;
      <Route path={TOURNAMENT_ROUND_ROUTE} component={Tournament} />
    </Switch>
  );
};

export default connect(state => ({
  platformData: state.platforamData.settings
}))(TournamentRoutes);
