import React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import NotificationsPage from "shared/components/notifications/general-settings.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { fetchNotificationSettings } from "shared/modules/notification-settings/services/notification-settings.services";
import { NextPageWithRedux } from "shared/utils/types";

const Notifications: NextPageWithRedux<Props, {}> = ({}) => {
  return <NotificationsPage />;
};

Notifications.getInitialProps = async ctx => {
  await Promise.all([ctx.reduxStore.dispatch(fetchNotificationSettings(ctx))]);
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchNotificationSettings },
    dispatch
  )
});

export default compose(
  connect(mapDispatchToProps),
  withDefaultLayout,
  withPrivateRoute
)(Notifications);

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchNotificationSettings: typeof fetchNotificationSettings;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps {}
