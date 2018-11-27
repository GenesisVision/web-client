import Notifications from "pages/app/components/notifications/components/notifications";
import {
  serviceNotificationsClose,
  serviceGetNotifications
} from "pages/app/components/notifications/services/notifications.services";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class NotificationsContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.open) {
      return (
        JSON.stringify(nextProps.notifications) !==
          JSON.stringify(this.props.notifications) ||
        nextProps.open !== this.props.open
      );
    }
    return nextProps.open !== this.props.open;
  }

  render() {
    const { service, open, notifications, count, total } = this.props;
    return (
      <Notifications
        open={open}
        count={count}
        total={total}
        notifications={notifications}
        fetchNotifications={service.serviceGetNotifications}
        clearNotifications={service.serviceClearNotifications}
        closeNotifications={service.serviceNotificationsClose}
      />
    );
  }
}

const mapStateToProps = ({ notifications, profileHeader }) => {
  let count = 0;
  if (profileHeader.info.data) {
    count = profileHeader.info.data.notificationsCount;
  }
  return {
    open: notifications.isOpen,
    notifications: notifications.notifications,
    total: notifications.total,
    count
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      serviceGetNotifications,
      serviceNotificationsClose
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
