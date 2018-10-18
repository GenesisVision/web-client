import { GVTab, GVTabs } from "gv-react-components";
import ProfileEditPage from "pages/profile/edit/edit.page";
import PasswordPage from "pages/profile/password/password.page";
import ProfilePage from "pages/profile/profile/profile.page";
import SettingsPage from "pages/profile/settings/settings.page";
import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

export const PROFILE_ROUTE = "/profile";
export const PROFILE_EDIT_ROUTE = `${PROFILE_ROUTE}/edit`;
export const SETTINGS_ROUTE = `${PROFILE_ROUTE}/settings`;
export const PASSWORD_ROUTE = `${PROFILE_ROUTE}/password`;

const ProfileRoutes = () => (
  <Switch>
    <Route path={PASSWORD_ROUTE} component={PasswordPage} />
    <Route path={SETTINGS_ROUTE} component={SettingsPage} />
    <Route path={PROFILE_EDIT_ROUTE} component={ProfileEditPage} />
    <Route path={PROFILE_ROUTE} component={ProfilePage} />
  </Switch>
);

export default ProfileRoutes;
