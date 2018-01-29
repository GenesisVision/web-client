import { Switch, Route } from "react-router-dom";
import React from "react";

import { PROFILE_EDIT_ROUTE, PROFILE_ROUTE } from "./profile.constants";
import ProfileContainer from "./components/profile-container/profile-container";
import ProfileFormContainer from "./components/profile-form-container/profile-form-container";

const ProfileRoutes = () => (
  <Switch>
    <Route exact path={PROFILE_ROUTE} component={ProfileContainer} />
    <Route path={PROFILE_EDIT_ROUTE} component={ProfileFormContainer} />
  </Switch>
);

export default ProfileRoutes;
