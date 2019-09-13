import React from "react";
import { compose } from "redux";
import SettingsPage from "shared/components/profile/settings/settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Settings: React.FC = () => {
  return <SettingsPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Settings);
