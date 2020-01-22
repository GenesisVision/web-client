import { notificationsToggleAction } from "components/notifications/actions/notifications.actions";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "components/notifications/services/notifications.services";
import Sidebar, { SIDEBAR_POSITION } from "components/sidebar/sidebar";
import { NotificationList, NotificationViewModel } from "gv-api-web";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { connect } from "react-redux";
import { notificationsCountSelector } from "reducers/header-reducer";
import { RootState } from "reducers/root-reducer";
import { compose } from "redux";
import { MiddlewareDispatch } from "utils/types";

const Notifications = dynamic(() =>
  import("components/notifications/components/notifications")
);

const _NotificationsContainer: React.FC<Props> = ({
  service,
  open,
  notifications,
  count,
  total
}) => {
  return (
    <Sidebar
      open={open}
      position={SIDEBAR_POSITION.RIGHT}
      onClose={service.toggleNotifications}
    >
      <Notifications
        fetchNotifications={service.getNotifications}
        count={count}
        total={total}
        notifications={notifications}
        clearNotifications={service.clearNotifications}
        closeNotifications={service.toggleNotifications}
      />
    </Sidebar>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  const { notifications } = state;
  return {
    open: notifications.isOpen,
    total: notifications.total,
    count: notificationsCountSelector(state),
    notifications: notifications.notifications
  };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    toggleNotifications: () => dispatch(notificationsToggleAction(false)),
    getNotifications: () => dispatch(serviceGetNotifications()),
    clearNotifications: () => dispatch(serviceClearNotifications())
  }
});

const NotificationsContainer = compose<React.ComponentType>(
  connect<StateProps, DispatchProps, null, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_NotificationsContainer);
export default NotificationsContainer;

interface StateProps {
  count: number;
  open: boolean;
  total: number;
  notifications: NotificationViewModel[];
}

interface DispatchProps {
  service: {
    getNotifications(): Promise<NotificationList>;
    clearNotifications(): void;
    toggleNotifications(): void;
  };
}

interface Props extends StateProps, DispatchProps {}
