import NotificationsPage from "components/notifications/general-settings.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <NotificationsPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["notifications-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
