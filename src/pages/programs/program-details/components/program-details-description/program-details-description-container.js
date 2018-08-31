import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as programDetailsService from "../../services/program-details.service";
import ProgramDetailsDescription from "./program-details-description";

class ProgramDetailsDescriptionContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getProgramDetails();
  }

  render() {
    const { programDetails } = this.props;
    console.dir(programDetails);

    return <ProgramDetailsDescription data={programDetails} />;
  }
}

const mapStateToProps = state => {
  return {
    programDetails: state.programDetails.data
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programDetailsService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsDescriptionContainer);
