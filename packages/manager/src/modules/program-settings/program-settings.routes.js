import React from "react";
import { Route } from "react-router-dom";

import ProgramSettingsCreateContainer from "./components/program-settings-create-container/program-settings-create-container";
import ProgramSettingsEditContainer from "./components/program-settings-edit-container/program-settings-edit-container";
import {
  PROGRAM_SETTINGS_CREATE_ROUTE,
  PROGRAM_SETTINGS_EDIT_ROUTE
} from "./program-settings.constants";

export const ProgramSettingsCreateRoutes = () => (
  <Route
    path={PROGRAM_SETTINGS_CREATE_ROUTE}
    component={ProgramSettingsCreateContainer}
  />
);

export const ProgramSettingsEditRoutes = () => (
  <Route
    path={PROGRAM_SETTINGS_EDIT_ROUTE}
    component={ProgramSettingsEditContainer}
  />
);
