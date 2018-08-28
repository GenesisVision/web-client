import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as programDetailsService from "../../services/program-details.service";
import ProgramDetailsDescription from "./program-details-description";

class ProgramDetailsDescriptionContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
  }

  render() {
    return <ProgramDetailsDescription />;
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
)(ProgramDetailsDescriptionContainer);
