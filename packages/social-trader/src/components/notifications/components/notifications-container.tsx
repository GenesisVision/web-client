import { notificationsToggleAction } from "components/notifications/actions/notifications.actions";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "components/notifications/services/notifications.services";
import Sidebar, { SIDEBAR_POSITION } from "components/sidebar/sidebar";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationsCountSelector } from "reducers/header-reducer";
import { RootState } from "reducers/root-reducer";

const Notifications = dynamic(() =>
  import("components/notifications/components/notifications")
);

const _NotificationsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.notifications.isOpen);
  const total = useSelector((state: RootState) => state.notifications.total);
  const count = useSelector(notificationsCountSelector);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const toggleNotifications = useCallback(
    () => dispatch(notificationsToggleAction(false)),
    []
  );
  const getNotifications = useCallback(
    () => dispatch(serviceGetNotifications()),
    []
  );
  const clearNotifications = useCallback(
    () => dispatch(serviceClearNotifications()),
    []
  );

  return (
    <Sidebar
      open={open}
      position={SIDEBAR_POSITION.RIGHT}
      onClose={toggleNotifications}
    >
      <Notifications
        fetchNotifications={getNotifications}
        count={count}
        total={total}
        notifications={notifications}
        clearNotifications={clearNotifications}
        closeNotifications={toggleNotifications}
      />
    </Sidebar>
  );
};

const NotificationsContainer = React.memo(_NotificationsContainer);
export default NotificationsContainer;
