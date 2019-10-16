import React from "react";
import { compose } from "redux";
import NotificationsPage from "shared/components/notifications/general-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchNotificationSettings } from "shared/modules/notification-settings/services/notification-settings.services";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <NotificationsPage />;
};

Page.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(fetchNotificationSettings(ctx))]);
};

export const Notifications = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
