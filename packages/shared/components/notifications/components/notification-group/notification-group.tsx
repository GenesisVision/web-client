import { NotificationViewModel } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import Notification from "shared/components/notifications/components/notification/notification";

interface Props {
  title: string;
  notifications: NotificationViewModel[];
  closeNotifications(): void;
}

class NotificationsGroup extends React.PureComponent<Props> {
  renderNotifications = (notification: NotificationViewModel) => (
    <Notification
      key={notification.id}
      {...notification}
      closeNotifications={this.props.closeNotifications}
    />
  );
  render() {
    const { notifications, title } = this.props;
    return (
      <div className="notifications__group">
        <div className="notifications__title">{title}</div>
        {notifications.map(this.renderNotifications)}
      </div>
    );
  }
}

export default translate()(NotificationsGroup);
