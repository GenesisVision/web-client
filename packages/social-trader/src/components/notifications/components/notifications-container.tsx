import { calculateOptions } from "components/notifications/actions/notifications.actions";
import Notifications from "components/notifications/components/notifications";
import { initialOptions } from "components/notifications/components/notifications.helpers";
import { serviceGetNotifications } from "components/notifications/services/notifications.services";
import { NotificationList } from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationsCountSelector } from "reducers/header-reducer";
import { RootState } from "reducers/root-reducer";
import { ReduxDispatch } from "utils/types";

const _NotificationsContainer: React.FC<Props> = ({ setClose }) => {
  const [options, setOptions] = useState(initialOptions);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch<ReduxDispatch>();
  const count = useSelector(notificationsCountSelector);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const getNotifications = useCallback(
    () =>
      dispatch(serviceGetNotifications(options)).then(
        (res: NotificationList) => {
          const newOptions = calculateOptions(options, res.total);
          setOptions(newOptions);
          setTotal(res.total);
        }
      ),
    [options]
  );

  return (
    <Notifications
      fetchNotifications={getNotifications}
      count={count}
      total={total}
      notifications={notifications}
      closeNotifications={setClose}
    />
  );
};

interface Props {
  setClose: VoidFunction;
}

const NotificationsContainer = React.memo(_NotificationsContainer);
export default NotificationsContainer;
