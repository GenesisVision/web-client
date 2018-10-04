import "./notifications.scss";

import Chip from "components/chip/chip";
import { ControlsIcon } from "components/icon/icon";
import { RingIcon } from "components/icon/ring-icon";
import InfinityScroll from "components/infinity-scroll/inifinity-scroll";
import moment from "moment";
import NotificationsGroup from "pages/app/components/notifications/components/notification-group/notification-group";
import { notificationProps } from "pages/app/components/notifications/components/notification/notification";
import { NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

//TODO: отрефакторить
class Notifications extends Component {
  state = {
    isPending: false
  };

  fetchNotification = () => {
    this.setState({ isPending: true });
    this.props.fetchNotifications().then(data => {
      this.setState({ isPending: false });
    });
  };

  getGroups = notifications => {
    const { t } = this.props;
    return notifications.reduce((acc, notification) => {
      const key = moment(notification.date)
        .calendar(null, {
          sameDay: `[${t("notifications-aside.today")}], DD MMMM`,
          lastDay: `[${t("notifications-aside.yesterday")}], DD MMMM`,
          lastWeek: "dddd, DD MMMM",
          sameElse: "dddd, DD MMMM"
        })
        .toUpperCase();
      if (!Array.isArray(acc[key])) {
        acc[key] = [];
      }
      acc[key].push(notification);
      return acc;
    }, {});
  };

  renderGroups = groups => group => (
    <NotificationsGroup
      key={group}
      title={group}
      notifications={groups[group]}
    />
  );

  sortGroups = (a, b) => b - a;

  render() {
    const { t } = this.props;
    const { count, notifications } = this.props;
    const groups = this.getGroups(notifications);
    return (
      <div className="notifications">
        <InfinityScroll
          onLoad={this.fetchNotification}
          disabled={this.state.isPending}
        >
          <div className="notifications__header">
            <RingIcon />
            {t("notifications-aside.header")}
            <div className="notifications__count">
              <Chip type="negative">{count}</Chip>
            </div>
            <Link to={NOTIFICATIONS_ROUTE}>
              <div className="notifications__link">
                <ControlsIcon />
              </div>
            </Link>
          </div>
          <div className="notifications__content">
            {Object.keys(groups)
              .sort(this.sortGroups)
              .map(this.renderGroups(groups))}
          </div>
        </InfinityScroll>
      </div>
    );
  }
}

Notifications.propTypes = {
  fetchNotifications: PropTypes.func.isRequired,
  count: PropTypes.number,
  notifications: PropTypes.arrayOf(PropTypes.shape(notificationProps)),
  total: PropTypes.number
};

Notifications.defaultProps = {
  notifications: [],
  total: 40
};

export default translate()(Notifications);
