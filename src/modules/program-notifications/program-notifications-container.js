import PropTypes from "prop-types";
import React, { Component } from "react";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

import ProgramNotifications from "./program-notifications";

class ProgramNotificationsContainer extends Component {
  state = {
    program: null
  };
  componentDidMount() {
    notificationsApi
      .v10NotificationsSettingsProgramsByIdGet(
        this.props.id,
        authService.getAuthArg()
      )
      .then(program => this.setState({ program }));
  }

  render() {
    const { program } = this.state;
    if (!program) return null;
    return <ProgramNotifications program={program} />;
  }
}

ProgramNotificationsContainer.propTypes = {
  id: PropTypes.string
};

export default ProgramNotificationsContainer;
