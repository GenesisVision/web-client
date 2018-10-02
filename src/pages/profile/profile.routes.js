import ProfilePage, { PROFILE_ROUTE } from "pages/profile/profile/profile.page";
import { SETTINGS_ROUTE } from "pages/profile/settings/settings.page";
import SettingsPage from "pages/profile/settings/settings.page";
import React from "react";
import { Route, Switch } from "react-router-dom";

const ProfileRoutes = () => (
  <Switch>
    <Route path={SETTINGS_ROUTE} component={SettingsPage} />
    <Route path={PROFILE_ROUTE} component={ProfilePage} />
  </Switch>
);

export default ProfileRoutes;
