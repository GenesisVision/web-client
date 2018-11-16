import Notification, { notificationProps } from "../notification/notification";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

class NotificationsGroup extends Component {
  renderNotifications = notification => (
    <Notification key={notification.id} {...notification} />
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

NotificationsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape(notificationProps))
};

export default translate()(NotificationsGroup);
