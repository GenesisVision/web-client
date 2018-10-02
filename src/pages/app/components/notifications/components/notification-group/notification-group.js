import moment from "moment";
import Notification, {
  notificationProps
} from "pages/app/components/notifications/components/notification/notification";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import * as uuid from "uuid";

class NotificationsGroup extends Component {
  renderNotifications = notification => (
    <Notification key={uuid.v4()} {...notification} /> //FIXME: исправить когда будут уникальные ID
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
