import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import programDetailsService from "../../services/program-details.service";
import ProgramDetailsHistory from "./program-details-history";

class ProgramDetailsHistoryContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
  }

  render() {
    return <ProgramDetailsHistory />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programDetailsService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsHistoryContainer);
