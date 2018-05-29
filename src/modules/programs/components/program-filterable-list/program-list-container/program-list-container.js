import { connect } from "react-redux";
import React, { Component } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import ProgramList from "./program-list/program-list";
import programsService from "../../../service/programs-service";

import { PROGRAM_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";

class ProgramListContainer extends Component {
  componentDidMount() {
    const { getPrograms } = this.props;
    getPrograms();
  }

  render() {
    const {
      isPending,
      programs,
      isAuthenticated,
      openInvestPopup,
      toggleFavoriteProgram
    } = this.props;
    if (isPending || !programs) return null;
    return (
      <ProgramList
        programs={programs.investmentPrograms}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
        toggleFavoriteProgram={toggleFavoriteProgram}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.programsData.programs.items;
  return { isPending, programs: data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  getPrograms: () => {
    dispatch(programsService.getPrograms());
  },
  toggleFavoriteProgram: program => () => {
    dispatch(programsService.toggleFavoriteProgram(program));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  const closeInvestPopup = () => {
    return programsService.updateAfterInvestment();
  };
  return {
    ...stateProps,
    ...otherDispatchProps,
    ...ownProps,
    openInvestPopup: programId => () => {
      dispatch(
        popupActions.openPopup(
          PROGRAM_DEPOSIT_POPUP,
          {
            programId
          },
          closeInvestPopup
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProgramListContainer);
