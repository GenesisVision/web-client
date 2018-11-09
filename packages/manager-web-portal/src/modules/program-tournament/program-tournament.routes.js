import React from "react";
import { Route } from "react-router-dom";
import { PROGRAM_SETTINGS_CREATE_TOURNAMENT_ROUTE } from "./program-tournament.constants";

import Create from "./components/program-tournament-create-container/program-tournament-create-container";

export const ProgramSettingsCreateTournamentRoutes = () => (
  <Route path={PROGRAM_SETTINGS_CREATE_TOURNAMENT_ROUTE} component={Create} />
);
