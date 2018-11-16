import Sidebar from "shared/components/sidebar/sidebar";
import { notificationsToggle } from "../actions/notifications.actions";
import Notifications from "./notifications";
import {
  serviceClearNotifications,
  serviceGetNotifications
} from "../services/notifications.services";
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
