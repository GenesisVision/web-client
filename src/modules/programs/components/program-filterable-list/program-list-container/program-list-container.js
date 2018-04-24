import { connect } from "react-redux";
import React, { Component } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import ProgramList from "./program-list/program-list";
import programsService from "../../../service/programs-service";

import { PROGRAM_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";

class ProgramListContainer extends Component {
  componentWillMount() {
    const { getPrograms } = this.props;
    getPrograms();
  }

  render() {
    const {
      isPending,
      programs,
      isAuthenticated,
      openInvestPopup,
      addFavoriteProgram,
      removeFavoriteProgram
    } = this.props;
    if (isPending || !programs) return null;
    return (
      <ProgramList
        programs={programs.investmentPrograms}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
        addFavoriteProgram={addFavoriteProgram}
        removeFavoriteProgram={removeFavoriteProgram}
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
  addFavoriteProgram: id => {
    dispatch(programsService.addFavoriteProgram(id));
  },
  removeFavoriteProgram: id => {
    dispatch(programsService.removeFavoriteProgram(id));
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ProgramListContainer
);
