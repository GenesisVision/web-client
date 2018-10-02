import Sidebar from "components/sidebar/sidebar";
import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import Notifications from "pages/app/components/notifications/components/notifications";
import { serviceGetNotifications } from "pages/app/components/notifications/services/notifications.services";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const NotificationsContainer = ({ service, open, notifications, count }) => {
  return (
    <Sidebar open={open} position="right" onClose={service.notificationsToggle}>
      <Notifications
        fetchNotifications={service.serviceGetNotifications}
        count={count}
        notifications={notifications}
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
    count
  };
};

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
