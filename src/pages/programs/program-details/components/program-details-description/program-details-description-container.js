import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";

import {
  PROGRAM_AUTHOR_ROUTE,
  PROGRAM_INVEST_ROUTE
} from "../../../programs.routes";
import * as programDetailsService from "../../services/program-details.service";
import ProgramDetailsDescription from "./program-details-description";
import ProgramDetailsNavigation from "./program-details-navigation/program-details-navigation";

class ProgramDetailsDescriptionContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.fetchProgramDetails();
  }

  render() {
    const { programDetails, goBack, toggleReinvest } = this.props;
    console.dir(programDetails);

    // if (!programDetails) return null;

    return (
      <Fragment>
        <ProgramDetailsNavigation goBack={goBack} />
        <ProgramDetailsDescription
          model={programDetails}
          programAuthorUrl={PROGRAM_AUTHOR_ROUTE}
          programInvestUrl={PROGRAM_INVEST_ROUTE}
          toggleReinvest={toggleReinvest}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    programDetails: state.programDetails.programDetailsDescription.data
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programDetailsService, dispatch),
  goBack: () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailsDescriptionContainer);
