import "./notification.scss";

import Chip from "components/chip/chip";
import { ControlsIcon, RingIcon } from "components/icon/icon";
import { groupBy } from "lodash/collection";
import moment from "moment";
import NotificationsGroup from "pages/app/components/notifications/components/notification-group/notification-group";
import { notificationProps } from "pages/app/components/notifications/components/notification/notification";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  getGroups = () => {
    return groupBy(this.props.notifications, el => moment(el.date).unix());
  };

  renderGroups = groups => group => (
    <NotificationsGroup timestamp={group} notifications={groups[group]} />
  );

  sortGroups = (a, b) => b - a;

  render() {
    const { t, notifications } = this.props;
    const groups = this.getGroups();

    return (
      <Fragment>
        <div className="notifications__header">
          <RingIcon />
          {t("notifications-aside.header")}
          <div className="notifications__count">
            <Chip type="negative">{notifications.length}</Chip>
          </div>
          <div className="profile-widget__avatar">
            <ControlsIcon />
          </div>
        </div>
        <div className="notifications__content">
          {Object.keys(groups)
            .sort(this.sortGroups)
            .map(this.renderGroups(groups))}
        </div>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  fetchNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(notificationProps)
};

Notifications.defaultProps = {
  notifications: []
};

export default translate()(Notifications);
