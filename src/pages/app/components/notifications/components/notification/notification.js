import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

export const notificationProps = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string
  })
};

const Notification = ({ notification }) => {
  return (
    <div className="notification">
      <div className="notification__description">
        {notification.description}
      </div>
      <div className="notification__date">
        {moment(notification.date).format("hh:mm a")}
      </div>
    </div>
  );
};

Notification.propTypes = notificationProps;

export default Notification;
