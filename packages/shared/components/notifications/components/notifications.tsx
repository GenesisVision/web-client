import "./notifications.scss";

import {
  CancelablePromise,
  NotificationList,
  NotificationViewModel
} from "gv-api-web";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { Icon } from "shared/components/icon/icon";
import { RingIcon } from "shared/components/icon/ring-icon";
import InfinityScroll from "shared/components/infinity-scroll/inifinity-scroll";
import Link from "shared/components/link/link";
import NotificationsGroup from "shared/components/notifications/components/notification-group/notification-group";
import Spinner from "shared/components/spiner/spiner";
import useIsOpen from "shared/hooks/is-open.hook";

import { NOTIFICATIONS_ROUTE } from "../notifications.routes";

const _Notifications: React.FC<Props> = ({
  notifications = [],
  total = 0,
  count,
  t,
  fetchNotifications,
  closeNotifications,
  clearNotifications
}) => {
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();
  useEffect(
    () => {
      fetchNotification();
      return clearNotifications;
    },
    [clearNotifications, fetchNotification]
  );
  const parseDate = (unix: number): string =>
    moment
      .unix(unix)
      .calendar(undefined, {
        sameDay: `[${t("notifications-aside.today")}], DD MMMM`,
        lastDay: `[${t("notifications-aside.yesterday")}], DD MMMM`,
        lastWeek: "dddd, DD MMMM",
        sameElse: "dddd, DD MMMM"
      })
      .toUpperCase();
  const fetchNotification = useCallback(
    () => {
      if (isPending) return;
      setIsPending();
      fetchNotifications().finally(setIsNotPending);
    },
    [fetchNotifications, isPending, setIsNotPending, setIsPending]
  );
  const renderGroups = (groups: NotificationGroups) => (
    group: string
  ): React.ReactNode => (
    <NotificationsGroup
      key={group}
      title={parseDate(parseInt(group))}
      notifications={groups[parseInt(group)]}
      closeNotifications={closeNotifications}
    />
  );
  const sortGroups = (a: string, b: string) => parseInt(b) - parseInt(a);
  const groups = notifications.reduce<NotificationGroups>(
    (acc, notification) => {
      const key = moment(notification.date)
        .startOf("day")
        .unix();
      if (!Array.isArray(acc[key])) {
        acc[key] = [];
      }
      acc[key].push(notification);
      return acc;
    },
    {}
  );
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

const Notifications = translate()(React.memo(_Notifications));
export default Notifications;

type OwnProps = {
  fetchNotifications(): CancelablePromise<NotificationList>;
  clearNotifications(): void;
  closeNotifications(): void;
  count: number;
  total: number;
  notifications: NotificationViewModel[];
};

type Props = OwnProps & WithTranslation;

type NotificationGroups = { [name: number]: NotificationViewModel[] };
