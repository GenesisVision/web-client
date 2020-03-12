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
import { MiddlewareDispatch } from "utils/types";

const Notifications = dynamic(() =>
  import("components/notifications/components/notifications")
);

const _NotificationsContainer: React.FC<Props> = ({ isOpen, setClose }) => {
  const dispatch = useDispatch<MiddlewareDispatch>();
  const total = useSelector((state: RootState) => state.notifications.total);
  const count = useSelector(notificationsCountSelector);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
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
    <Sidebar open={isOpen} position={SIDEBAR_POSITION.RIGHT} onClose={setClose}>
      <Notifications
        fetchNotifications={getNotifications}
        count={count}
        total={total}
        notifications={notifications}
        clearNotifications={clearNotifications}
        closeNotifications={setClose}
      />
    </Sidebar>
  );
};

interface Props {
  isOpen: boolean;
  setClose: VoidFunction;
}

const NotificationsContainer = React.memo(_NotificationsContainer);
export default NotificationsContainer;
