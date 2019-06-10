import { NotificationList, NotificationViewModel } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { notificationsToggleAction } from "shared/components/notifications/actions/notifications.actions";
import Notifications from "shared/components/notifications/components/notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "shared/components/notifications/services/notifications.services";
import Sidebar, { SIDEBAR_POSITION } from "shared/components/sidebar/sidebar";
import { RootState } from "shared/reducers/root-reducer";

const NotificationsContainer: React.FC<Props> = ({
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

const mapStateToProps = (props: RootState): StateProps => {
  const { notifications, profileHeader } = props;
  let count = 0;
  if (profileHeader.data) {
    count = profileHeader.data.notificationsCount;
  }
  return {
    open: notifications.isOpen,
    total: notifications.total,
    count,
    notifications: notifications.notifications
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, any>
): DispatchProps => ({
  service: {
    toggleNotifications: () => dispatch(notificationsToggleAction(false)),
    getNotifications: () =>
      dispatch<Promise<NotificationList>>(serviceGetNotifications()),
    clearNotifications: () => dispatch(serviceClearNotifications())
  }
});

export default connect<StateProps, DispatchProps, null, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);

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
