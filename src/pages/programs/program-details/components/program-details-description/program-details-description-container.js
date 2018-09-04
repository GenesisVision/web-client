import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";
import getParams from "utils/get-params";

import { PROGRAM_DETAILS_ROUTE } from "../../../programs.routes";
import * as programDetailsService from "../../services/program-details.service";
import ProgramDetailsDescription from "./program-details-description";
import ProgramDetailsNavigation from "./program-details-navigation/program-details-navigation";

class ProgramDetailsDescriptionContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.fetchProgramDetails();
  }

  toggleReinvesting = () => {
    const { programDetails, programId, service } = this.props;

    service.toggleReinvesting(programDetails, programId);
  };

  render() {
    const { programDetails, goBack } = this.props;
    const { toggleReinvesting } = this;

    if (!programDetails) return null;

    return (
      <Fragment>
        <ProgramDetailsNavigation goBack={goBack} />
        <ProgramDetailsDescription
          programDetails={programDetails}
          programAuthorUrl={""}
          programInvestUrl={""}
          programWithdrawUrl={""}
          toggleReinvesting={toggleReinvesting}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    programDetails: state.programDetails.programDetailsDescription.data,
    programId: getParams(state.routing.location.pathname, PROGRAM_DETAILS_ROUTE)
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { ...programDetailsService, toggleReinvesting },
    dispatch
  ),
  goBack: () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsDescriptionContainer);
