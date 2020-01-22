import "./notifications.scss";

import Chip, { CHIP_TYPE } from "components/chip/chip";
import { Icon } from "components/icon/icon";
import { RingIcon } from "components/icon/ring-icon";
import InfinityScroll from "components/infinity-scroll/inifinity-scroll";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import ClearButton from "components/notifications/components/ClearButton";
import NotificationsGroup from "components/notifications/components/notification-group/notification-group";
import Spinner from "components/spiner/spiner";
import dayjs from "dayjs";
import { NotificationList, NotificationViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NOTIFICATIONS_ROUTE } from "../notifications.routes";

const parseDate = (unix: number, sameDay: string, lastDay: string): string =>
  dayjs(unix)
    .calendar(undefined, {
      sameDay: `[${sameDay}], DD MMMM`,
      lastDay: `[${lastDay}], DD MMMM`,
      lastWeek: "dddd, DD MMMM",
      sameElse: "dddd, DD MMMM"
    })
    .toUpperCase();

const sortGroups = (a: string, b: string) => parseInt(b) - parseInt(a);

const getGroups = (
  notifications: NotificationViewModel[]
): NotificationGroups =>
  notifications.reduce<NotificationGroups>((acc, notification) => {
    const key = dayjs(notification.date)
      .startOf("day")
      .toDate()
      .getTime();
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
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const { isPending, sendRequest } = useApiRequest({
    request: fetchNotifications
  });
  useEffect(() => {
    fetchNotification();
    return clearNotifications;
  }, []);
  const fetchNotification = useCallback(() => !isPending && sendRequest(), [
    isPending
  ]);
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
          <div className="notifications__header-title">
            {t("notifications-aside.header")}
          </div>
          <div className="notifications__count">
            <Chip type={hasNotifications ? CHIP_TYPE.NEGATIVE : undefined}>
              {count}
            </Chip>
          </div>
          <div className="notifications__clear">
            {count !== 0 && <ClearButton />}
          </div>
          <Link
            to={linkCreator(NOTIFICATIONS_ROUTE)}
            onClick={() => closeNotifications()}
          >
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
  fetchNotifications: () => Promise<NotificationList>;
  clearNotifications: () => void;
  closeNotifications: () => void;
  count: number;
  total: number;
  notifications: NotificationViewModel[];
}

type NotificationGroups = { [name: number]: NotificationViewModel[] };
