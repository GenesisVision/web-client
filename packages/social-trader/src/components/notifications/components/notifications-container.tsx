import Notifications from "components/notifications/components/notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "components/notifications/services/notifications.services";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationsCountSelector } from "reducers/header-reducer";
import { RootState } from "reducers/root-reducer";

const _NotificationsContainer: React.FC<Props> = ({ setClose }) => {
  const dispatch = useDispatch();
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
    <Notifications
      fetchNotifications={getNotifications}
      count={count}
      total={total}
      notifications={notifications}
      clearNotifications={clearNotifications}
      closeNotifications={setClose}
    />
  );
};

interface Props {
  setClose: VoidFunction;
}

const NotificationsContainer = React.memo(_NotificationsContainer);
export default NotificationsContainer;
