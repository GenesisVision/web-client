import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";
import PersonalDetailsPage from "components/profile/personal-details/personal-details.page";

const Page: React.FC = () => {
  return <PersonalDetailsPage />;
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
