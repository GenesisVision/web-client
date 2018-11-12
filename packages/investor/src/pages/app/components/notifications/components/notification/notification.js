import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

export const notificationProps = {
  date: PropTypes.instanceOf(Date),
  logo: PropTypes.string,
  managerId: PropTypes.string,
  programId: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  isUnread: PropTypes.bool
};

const Notification = ({ date, text, isUnread, type }) => {
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
        <div className="notification__date">
          {moment(date).format("hh:mm a")}
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = notificationProps;

export default Notification;
