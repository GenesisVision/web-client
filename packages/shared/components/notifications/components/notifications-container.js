import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { notificationsToggle } from "shared/components/notifications/actions/notifications.actions";
import Notifications from "shared/components/notifications/components/notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "shared/components/notifications/services/notifications.services";
import Sidebar from "shared/components/sidebar/sidebar";

const NotificationsContainer = ({
  service,
  open,
  notifications,
  count,
  total
}) => {
  return (
    <Sidebar open={open} position="right" onClose={service.notificationsToggle}>
      <Notifications
        fetchNotifications={service.serviceGetNotifications}
        count={count}
        total={total}
        notifications={notifications}
        clearNotifications={service.serviceClearNotifications}
        closeNotifications={service.notificationsToggle}
      />
    </Sidebar>
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
