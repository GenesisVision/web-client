import ProgramDepositContainer from "modules/program-deposit/components/program-deposit-container/program-deposit-container";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import popupActions from "../../../../popup/actions/popup-actions";
import ProgramList from "../../../../programs/components/program-filterable-list/program-list-container/program-list/program-list";
import { PROGRAMS_ROUTE } from "../../../../programs/programs.constants";
import programsService from "../../../../programs/service/programs-service";
import dashboardActions from "../../../actions/dashboard-actions";

class FavoritePrograms extends Component {
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

    if (programs.investmentPrograms.length === 0)
      return (
        <div className="dashboard-empty__text">
          Add your first favourite program on{" "}
          <Link className="link" to={PROGRAMS_ROUTE}>
            the program list page
          </Link>
          .
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
        popupActions.openPopup({
          component: ProgramDepositContainer,
          popupProps: {
            programId
          },
          onSubmitPopup: closeInvestPopup
        })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FavoritePrograms);
