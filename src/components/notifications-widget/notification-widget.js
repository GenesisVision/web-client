import "./notifications-widget.scss";

import classnames from "classnames";
import { RingCircleIcon, RingIcon } from "components/icon/icon";
import React from "react";

const NotificationWidget = ({
  hasNotifications = true,
  count = 23,
  className
}) => {
  return (
    <div
      className={classnames("notifications", className, {
        "notification--has": hasNotifications
      })}
    >
      <span className="notifications__icon">
        {hasNotifications ? <RingCircleIcon /> : <RingIcon />}
      </span>
      <span className="notifications__count">{count}</span>
    </div>
  );
};

export default NotificationWidget;
