import ProfileEditPage from "pages/profile/edit/edit.page";
import PasswordPage from "pages/profile/password/password.page";
import {
  PASSWORD_ROUTE,
  PROFILE_EDIT_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "pages/profile/profile.constants";
import ProfilePage from "pages/profile/profile/profile.page";
import SettingsPage from "pages/profile/settings/settings.page";
import React from "react";
import { Route, Switch } from "react-router-dom";

const ProfileRoutes = () => (
  <Switch>
    <Route path={PASSWORD_ROUTE} component={PasswordPage} />
    <Route path={SETTINGS_ROUTE} component={SettingsPage} />
    <Route path={PROFILE_EDIT_ROUTE} component={ProfileEditPage} />
    <Route path={PROFILE_ROUTE} component={ProfilePage} />
  </Switch>
);

export default ProfileRoutes;
