import moment from "moment";
import Notification, {
  notificationProps
} from "pages/app/components/notifications/components/notification/notification";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

class NotificationsGroup extends Component {
  renderNotifications = notification => (
    <Notification key={notification.id} {...notification} />
  );
  getTitle = () => {
    const { t } = this.props;
    return moment
      .unix(this.props.timestamp)
      .calendar(null, {
        sameDay: `[${t("notifications-aside.today")}], DD MMMM`,
        lastDay: `[${t("notifications-aside.yesterday")}], DD MMMM`,
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

export default translate()(NotificationsGroup);
