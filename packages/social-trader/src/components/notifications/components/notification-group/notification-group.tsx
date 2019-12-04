import Notification from "components/notifications/components/notification/notification";
import { NotificationViewModel } from "gv-api-web";
import * as React from "react";

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

interface Props {
  title: string;
  notifications: NotificationViewModel[];
  closeNotifications(): void;
}

const NotificationsGroup = React.memo(_NotificationsGroup);
export default NotificationsGroup;
