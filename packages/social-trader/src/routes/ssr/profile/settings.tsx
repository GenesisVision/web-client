import SettingsPage from "components/profile/settings/settings.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <SettingsPage />;
};

export const Settings = compose(withDefaultLayout, withPrivateRoute)(Page);
