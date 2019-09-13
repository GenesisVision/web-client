import React from "react";
import { compose } from "redux";
import NotificationsPage from "shared/components/notifications/general-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchNotificationSettings } from "shared/modules/notification-settings/services/notification-settings.services";
import { NextPageWithRedux } from "shared/utils/types";

const Notifications: NextPageWithRedux<void> = ({}) => {
  return <NotificationsPage />;
};

Notifications.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(fetchNotificationSettings(ctx))]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Notifications);
