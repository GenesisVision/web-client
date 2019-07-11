import { NotificationViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Notification from "shared/components/notifications/components/notification/notification";

const _NotificationsGroup: React.FC<Props> = ({
  closeNotifications,
  notifications,
  title
}) => (
  <div className="notifications__group">
    <div className="notifications__title">{title}</div>
    {notifications.map((notification: NotificationViewModel) => (
      <Notification
        key={notification.id}
        {...notification}
        closeNotifications={closeNotifications}
      />
    ))}
  </div>
);

interface Props extends WithTranslation {
  title: string;
  notifications: NotificationViewModel[];
  closeNotifications(): void;
}

const NotificationsGroup = translate()(React.memo(_NotificationsGroup));
export default NotificationsGroup;
