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
  id: PropTypes.string
};

const Notification = ({ date, text }) => {
  return (
    <div className="notification">
      <div className="notification__description">{text}</div>
      <div className="notification__date">{moment(date).format("hh:mm a")}</div>
    </div>
  );
};

Notification.propTypes = notificationProps;

export default Notification;
