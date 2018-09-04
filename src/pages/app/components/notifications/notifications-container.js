import { notificationsToggle } from "pages/app/components/notifications/actions/notifications.actions";
import Notifications from "pages/app/components/notifications/notification";
import { serviceGetNotifications } from "pages/app/components/notifications/services/notifications.services";
import React, { Component } from "react";
import { connect } from "react-redux";

class NotificationsContainer extends Component {
  render() {
    return (
      <Notifications
        open={this.props.open}
        onClose={this.props.notificationsToggle}
        fetchNotifications={this.props.serviceGetNotifications}
        notifications={this.props.notifications}
      />
    );
  }
}

const mapStateToProps = ({ notifications }) => ({
  open: notifications.isOpen,
  notifications: notifications.notifications.data
});

const mapDispatchToProps = {
  notificationsToggle,
  serviceGetNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
