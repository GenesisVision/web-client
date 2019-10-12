import React from "react";
import { compose } from "redux";
import ProfilePage from "shared/components/profile/profile/profile.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Page: React.FC = () => {
  return <ProfilePage />;
};

export const Profile = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
