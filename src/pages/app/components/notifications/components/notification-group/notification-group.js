import moment from "moment";
import Notification, {
  notificationProps
} from "pages/app/components/notifications/components/notification/notification";
import PropTypes from "prop-types";
import React, { Component } from "react";

class NotificationsGroup extends Component {
  renderNotifications = notification => (
    <Notification key={notification.id} {...notification} />
  );
  getTitle = () => {
    return moment
      .unix(this.props.timestamp)
      .calendar(null, {
        sameDay: "[TODAY], DD MMMM",
        lastDay: "[YESTERDAY], DD MMMM",
        lastWeek: "dddd, DD MMMM",
        sameElse: "dddd, DD MMMM"
      })
      .toUpperCase();
  };
  render() {
    const { notifications } = this.props;
    return (
      <div className="notifications__group">
        <div className="notifications__title">{this.getTitle()}</div>
        {notifications.map(this.renderNotifications)}
      </div>
    );
  }
}

NotificationsGroup.propTypes = {
  timestamp: PropTypes.number.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape(notificationProps))
};

export default NotificationsGroup;
