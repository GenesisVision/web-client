import "./notifications.scss";

import Chip from "shared/components/chip/chip";
import { ControlsIcon } from "shared/components/icon/icon";
import { RingIcon } from "shared/components/icon/ring-icon";
import InfinityScroll from "shared/components/infinity-scroll/inifinity-scroll";
import moment from "moment";
import NotificationsGroup from "pages/app/components/notifications/components/notification-group/notification-group";
import { notificationProps } from "pages/app/components/notifications/components/notification/notification";
import { NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import Sidebar from "shared/components/sidebar/sidebar";
import posed, { PoseGroup } from "react-pose";
import Spinner from "shared/components/spiner/spiner";

const GroupBox = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 150 },
    delay: ({ i }) => i * 25
  },
  exit: {
    y: 20,
    transition: { duration: 150 },
    opacity: 0
  }
});

class Notifications extends Component {
  state = {
    isPending: true
  };

  fetchNotification = () => {
    this.setState({ isPending: true });
    return this.props.fetchNotifications().then(() => {
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

  renderGroups = groups => (group, i) => (
    <GroupBox key={group} i={i}>
      <NotificationsGroup
        key={group}
        title={group}
        notifications={groups[group]}
      />
    </GroupBox>
  );

  sortGroups = (a, b) => b - a;

  handleClose = () => {
    this.props.closeNotifications();
  };

  close = () => {
    this.sidebar.current.close();
  };

  handleOpen = () => {
    this.fetchNotification();
  };

  sidebar = React.createRef();

  render() {
    const { t, open } = this.props;
    const { notifications, total, count } = this.props;
    const groups = this.getGroups(notifications);
    const hasMore = total > notifications.length;
    const hasNotifications = count > 0;
    return (
      <Sidebar
        ref={this.sidebar}
        open={open}
        position="right"
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        <div className="notifications">
          <InfinityScroll loadMore={this.fetchNotification} hasMore={hasMore}>
            <div className="notifications__header">
              <div className="notifications__ring">
                <RingIcon />
              </div>
              {t("notifications-aside.header")}
              <div className="notifications__count">
                <Chip type={hasNotifications ? "negative" : null}>{count}</Chip>
              </div>
              <Link to={NOTIFICATIONS_ROUTE} onClick={this.close}>
                <div className="profile-avatar notifications__link">
                  <ControlsIcon />
                </div>
              </Link>
            </div>
            <div className="notifications__content">
              <PoseGroup animateOnMount>
                {Object.keys(groups)
                  .sort(this.sortGroups)
                  .map(this.renderGroups(groups))}
              </PoseGroup>
              <Spinner isShown={this.state.isPending} />
            </div>
          </InfinityScroll>
        </div>
      </Sidebar>
    );
  }
}

Notifications.propTypes = {
  fetchNotifications: PropTypes.func.isRequired,
  count: PropTypes.number,
  notifications: PropTypes.arrayOf(PropTypes.shape(notificationProps)),
  total: PropTypes.number,
  closeNotifications: PropTypes.func
};

Notifications.defaultProps = {
  notifications: [],
  total: 0
};

export default translate()(Notifications);
