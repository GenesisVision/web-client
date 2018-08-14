import "./notifications-widget.scss";

import classnames from "classnames";
import { RingIcon } from "components/icon/icon";
import React from "react";

const NotificationWidget = ({ notificationsAmount, className }) => {
  const hasNotifications = notificationsAmount > 0;
  return (
    <div
      className={classnames("notifications", className, {
        "notifications--has": hasNotifications
      })}
    >
      <span className="notifications__icon">
        <RingIcon />
      </span>
      <span className="notifications__count profile-header__label">
        {notificationsAmount}
      </span>
    </div>
  );
};

export default NotificationWidget;
