import NotificationsPage from "components/notifications/general-settings.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { fetchNotificationSettings } from "modules/notification-settings/services/notification-settings.services";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <NotificationsPage />;
};

Page.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(fetchNotificationSettings(ctx))]);
};

export const Notifications = compose(withDefaultLayout, withPrivateRoute)(Page);
