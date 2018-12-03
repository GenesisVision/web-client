import ProfileEditPage from "pages/profile/edit/edit.page";
import React from "react";
import { Route, Switch } from "react-router-dom";
import KYCPage from "shared/components/profile/kyc/kyc.page";
import PasswordPage from "shared/components/profile/password/password.page";
import {
  KYC_ROUTE,
  PASSWORD_ROUTE,
  PROFILE_EDIT_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import ProfilePage from "shared/components/profile/profile/profile.page";
import SettingsPage from "shared/components/profile/settings/settings.page";

const ProfilePageContainer = () => <ProfilePage personal />;

const ProfileRoutes = () => (
  <Switch>
    <Route path={KYC_ROUTE} component={KYCPage} />
    <Route path={PASSWORD_ROUTE} component={PasswordPage} />
    <Route path={SETTINGS_ROUTE} component={SettingsPage} />
    <Route path={PROFILE_EDIT_ROUTE} component={ProfileEditPage} />
    <Route path={PROFILE_ROUTE} component={ProfilePageContainer} />
  </Switch>
);

export default ProfileRoutes;
