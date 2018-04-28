import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";

import dashboardActions from "../../../actions/dashboard-actions";
import popupActions from "../../../../popup/actions/popup-actions";
import ProgramList from "../../../../programs/components/program-filterable-list/program-list-container/program-list/program-list";
import programsService from "../../../../programs/service/programs-service";

import { PROGRAM_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";
import { PROGRAMS_ROUTE } from "../../../../programs/programs.constants";

class FavoritePrograms extends Component {
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
      toggleFavoriteProgram
    } = this.props;
    if (isPending || !programs) return null;

    if (programs.investmentPrograms.length === 0)
      return (
        <div className="dashboard-empty__text">
          Add your first favourite program on{" "}
          <Link className="link" to={PROGRAMS_ROUTE}>
            the program list page
          </Link>.
        </div>
      );

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
  const { isPending, data } = state.dashboardData.favoritePrograms;
  return { isPending, programs: data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  getPrograms: () => {
    dispatch(dashboardActions.fetchFavoritesPrograms());
  },
  toggleFavoriteProgram: program => () => {
    dispatch(dashboardActions.removeFavoriteProgram(program));
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
  FavoritePrograms
);
