import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

export const notificationProps = {
  id: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string
};

const Notification = ({ id, description, date }) => {
  return (
    <div className="notification">
      <div className="notification__description">{description}</div>
      <div className="notification__date">{moment(date).format("hh:mm a")}</div>
    </div>
  );
};

Notification.propTypes = notificationProps;

export default Notification;
