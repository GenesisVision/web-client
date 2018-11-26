import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import Notifications from "pages/app/components/notifications/components/notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
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
      clearNotifications={service.serviceClearNotifications}
      closeNotifications={service.notificationsToggle}
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
      notificationsToggle,
      serviceGetNotifications,
      serviceClearNotifications
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
