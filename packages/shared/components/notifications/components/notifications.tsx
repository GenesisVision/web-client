import "./notifications.scss";

import { startOfDay } from "date-fns";
import { format, isToday, isYesterday } from "date-fns";
import {
  CancelablePromise,
  NotificationList,
  NotificationViewModel
} from "gv-api-web";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { Icon } from "shared/components/icon/icon";
import { RingIcon } from "shared/components/icon/ring-icon";
import InfinityScroll from "shared/components/infinity-scroll/inifinity-scroll";
import NotificationsGroup from "shared/components/notifications/components/notification-group/notification-group";
import Spinner from "shared/components/spiner/spiner";
import useApiRequest from "shared/hooks/api-request.hook";

import { NOTIFICATIONS_ROUTE } from "../notifications.routes";

const parseDate = (unix: number, sameDay: string, lastDay: string): string => {
  const date = new Date(unix);
  if (isToday(date)) {
    return format(date, `${sameDay}, dd MMMM`).toUpperCase();
  }
  if (isYesterday(date)) {
    return format(date, `${lastDay}, dd MMMM`).toUpperCase();
  }
  return format(date, "EEEE, dd MMMM").toUpperCase();
};

const sortGroups = (a: string, b: string) => parseInt(b) - parseInt(a);

const getGroups = (
  notifications: NotificationViewModel[]
): NotificationGroups =>
  notifications.reduce<NotificationGroups>((acc, notification) => {
    const key = startOfDay(new Date(notification.date)).getTime();
    if (!Array.isArray(acc[key])) {
      acc[key] = [];
    }
    acc[key].push(notification);
    return acc;
  }, {});

const _Notifications: React.FC<Props> = ({
  notifications = [],
  total = 0,
  count,
  fetchNotifications,
  closeNotifications,
  clearNotifications
}) => {
  const [t] = useTranslation();
  const { isPending, sendRequest } = useApiRequest({
    request: fetchNotifications
  });
  useEffect(() => {
    fetchNotification();
    return clearNotifications;
  }, []);
  const fetchNotification = useCallback(() => !isPending && sendRequest(), []);
  const renderGroups = (groups: NotificationGroups) => (
    group: string
  ): React.ReactNode => (
    <NotificationsGroup
      key={group}
      title={parseDate(
        parseInt(group),
        t("notifications-aside.today"),
        t("notifications-aside.yesterday")
      )}
      notifications={groups[parseInt(group)]}
      closeNotifications={closeNotifications}
    />
  );
  const groups = getGroups(notifications);
  const hasMore = total > notifications.length;
  const hasNotifications = count > 0;
  return (
    <div className="notifications">
      <InfinityScroll loadMore={fetchNotification} hasMore={hasMore}>
        <div className="notifications__header">
          <div className="notifications__ring">
            <RingIcon />
          </div>
          {t("notifications-aside.header")}
          <div className="notifications__count">
            <Chip type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}>
              {count}
            </Chip>
          </div>
          <Link to={NOTIFICATIONS_ROUTE} onClick={() => closeNotifications()}>
            <div className="profile-avatar notifications__link">
              <Icon type={"controls"} />
            </div>
          </Link>
        </div>
        <div className="notifications__content">
          {Object.keys(groups)
            .sort(sortGroups)
            .map<React.ReactNode>(renderGroups(groups))}
          <Spinner isShown={isPending} />
        </div>
      </InfinityScroll>
    </div>
  );
};

const Notifications = React.memo(_Notifications);
export default Notifications;

interface Props {
  fetchNotifications: () => CancelablePromise<NotificationList>;
  clearNotifications: () => void;
  closeNotifications: () => void;
  count: number;
  total: number;
  notifications: NotificationViewModel[];
}

type NotificationGroups = { [name: number]: NotificationViewModel[] };
