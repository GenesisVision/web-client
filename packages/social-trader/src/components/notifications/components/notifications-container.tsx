import Notifications from "components/notifications/components/notifications";
import {
  calculateOptions,
  initialOptions
} from "components/notifications/components/notifications.helpers";
import { fetchNotifications } from "components/notifications/services/notifications.services";
import { NotificationViewModelItemsViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { notificationsCountSelector } from "reducers/header-reducer";

const _NotificationsContainer: React.FC<Props> = ({ setClose }) => {
  const [options, setOptions] = useState(initialOptions);
  const [total, setTotal] = useState(0);
  const count = useSelector(notificationsCountSelector);
  const updateStateMiddleware = (res: NotificationViewModelItemsViewModel) => {
    const newOptions = calculateOptions(options, res.total);
    setOptions(newOptions);
    setTotal(res.total);
  };
  const { data, sendRequest, isPending } = useApiRequest({
    request: fetchNotifications,
    fetchOnMount: true,
    fetchOnMountData: options,
    middleware: [updateStateMiddleware]
  });

  const getNotifications = useCallback(() => {
    return sendRequest(options);
  }, [options]);

  return (
    <Notifications
      isPending={isPending}
      getNotifications={getNotifications}
      count={count}
      total={total}
      notifications={data?.items}
      closeNotifications={setClose}
    />
  );
};

interface Props {
  setClose: VoidFunction;
}

const NotificationsContainer = React.memo(_NotificationsContainer);
export default NotificationsContainer;
