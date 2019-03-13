import classnames from "classnames";
import { NotificationViewModel } from "gv-api-web";
import moment from "moment";
import React from "react";

const Notification: React.FunctionComponent<NotificationViewModel> = props => {
  const { date, text, isUnread, type } = props;
  return (
    <div
      className={classnames(
        "notification",
        `notification--type-${type.toLowerCase()}`,
        {
          "notification--is-unread": isUnread
        }
      )}
    >
      <div className="notification__content">
        <div className="notification__description">{text}</div>
        <div className="notification__date">{moment(date).format("LT")}</div>
      </div>
    </div>
  );
};

export default Notification;
