import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProgramNotifications from "./program-notifications";
import { fetchProgramNotificationsService } from "./services/program-notifications.services";

class ProgramNotificationsContainer extends Component {
  componentDidMount() {
    this.props.services.fetchProgramNotificationsService(this.props.id);
  }

  render() {
    const { program } = this.props;
    if (!program) return null;
    return <ProgramNotifications program={program} />;
  }
}

ProgramNotificationsContainer.propTypes = {
  id: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  program: state.programNotifications.data[props.id]
});

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ fetchProgramNotificationsService }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramNotificationsContainer);
