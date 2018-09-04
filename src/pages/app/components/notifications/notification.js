import "./notification.scss";

import Chip from "components/chip/chip";
import { ControlsIcon, RingIcon } from "components/icon/icon";
import Sidebar from "components/sidebar/sidebar";
import { groupBy } from "lodash/collection";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

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

Notification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string
  })
};

const NotificationsGroup = ({ title, notifications }) => {
  return (
    <div className="notifications__group">
      <div className="notifications__title">{title.toUpperCase()}</div>
      {notifications.map(n => (
        <Notification key={n.id} notification={n} />
      ))}
    </div>
  );
};

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { t, open, onClose, notifications } = this.props;
    const notificationsGroups = groupBy(notifications, el =>
      moment(el.date).calendar(null, {
        sameDay: "[Today], DD MM",
        lastDay: "[Yesterday], DD MM",
        lastWeek: "dddd, DD MM",
        sameElse: "dddd, DD MM"
      })
    );
    return (
      <Sidebar open={open} position="right" onClose={onClose}>
        <div className="notifications__header">
          <RingIcon />
          {t("notifications.header")}
          <div className="notifications__count">
            <Chip type="negative">{notifications.length}</Chip>
          </div>
          <div className="profile-widget__avatar">
            <ControlsIcon />
          </div>
        </div>
        <div className="notifications__content">
          {Object.keys(notificationsGroups).map(group => (
            <NotificationsGroup
              title={group}
              notifications={notificationsGroups[group]}
            />
          ))}
        </div>
      </Sidebar>
    );
  }
}

Notifications.propTypes = {
  open: PropTypes.bool.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(Notification.propTypes.notification)
};

Notifications.defaultProps = {
  notifications: []
};

export default translate()(Notifications);
