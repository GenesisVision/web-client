import Sidebar from "components/sidebar/sidebar";
import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import Notifications from "pages/app/components/notifications/components/notifications";
import { serviceGetNotifications } from "pages/app/components/notifications/services/notifications.services";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const NotificationsContainer = ({ service, open, notifications }) => {
  return (
    <Sidebar open={open} position="right" onClose={service.notificationsToggle}>
      <Notifications
        fetchNotifications={service.serviceGetNotifications}
        notifications={notifications}
      />
    </Sidebar>
  );
};

const mapStateToProps = ({ notifications }) => ({
  open: notifications.isOpen,
  notifications: notifications.notifications.data
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      notificationsToggle,
      serviceGetNotifications
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
