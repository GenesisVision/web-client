import ProfilePage from "components/profile/profile/profile.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <ProfilePage />;
};

export const Profile = compose(withDefaultLayout, withPrivateRoute)(Page);
