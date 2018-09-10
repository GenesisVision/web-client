import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import { MANAGER_DETAILS_ROUTE } from "pages/manager/manager.page";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";
import getParams from "utils/get-params";
import replaceParams from "utils/replace-params";

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
    const { programDetails, goBack, programAuthorUrl } = this.props;
    const { toggleReinvesting } = this;

    if (!programDetails) return null;

    return (
      <Fragment>
        <ProgramDetailsNavigation goBack={goBack} />
        <ProgramDetailsDescription
          programDetails={programDetails}
          programAuthorUrl={programAuthorUrl}
          programInvestUrl={""}
          programWithdrawUrl={""}
          toggleReinvesting={toggleReinvesting}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.programDetails.programDetailsDescription;

  return {
    programDetails: data,
    programId: getParams(
      state.routing.location.pathname,
      PROGRAM_DETAILS_ROUTE
    ),
    programAuthorUrl: replaceParams(MANAGER_DETAILS_ROUTE, {
      ":managerId": data && data.manager && data.manager.id
    })
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
