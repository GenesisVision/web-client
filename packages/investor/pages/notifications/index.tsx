import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import NotificationsPage from "shared/components/notifications/general-settings.page";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { fetchNotificationSettings } from "shared/modules/notification-settings/services/notification-settings.services";
import { connect, ResolveThunks } from "react-redux";
import withPrivateRoute from "shared/decorators/with-private-route";
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
