import {
  CancelablePromise,
  NotificationList,
  NotificationViewModel
} from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { notificationsToggleAction } from "shared/components/notifications/actions/notifications.actions";
import Notifications from "shared/components/notifications/components/notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "shared/components/notifications/services/notifications.services";
import Sidebar, { SIDEBAR_POSITION } from "shared/components/sidebar/sidebar";
import { notificationsCountSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";

import { MiddlewareDispatch } from "../../../utils/types";

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
    getNotifications(): CancelablePromise<NotificationList>;
    clearNotifications(): void;
    toggleNotifications(): void;
  };
}

interface Props extends StateProps, DispatchProps {}
