import Notifications from "pages/app/components/notifications/components/notifications";
import {
  serviceGetNotifications,
  serviceNotificationsClose
} from "pages/app/components/notifications/services/notifications.services";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const NotificationsContainer = ({
  service,
  open,
  notifications,
  count,
  total
}) => {
  return (
    <Notifications
      open={open}
      count={count}
      total={total}
      notifications={notifications}
      fetchNotifications={service.serviceGetNotifications}
      closeNotifications={service.serviceNotificationsClose}
    />
  );
};

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
      serviceNotificationsClose,
      serviceGetNotifications
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
