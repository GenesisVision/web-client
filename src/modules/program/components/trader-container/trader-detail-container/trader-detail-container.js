import { connect } from "react-redux";
import React, { PureComponent } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import traderActions from "../../../actions/program-actions";
import TraderDetail from "./trader-detail/trader-detail";

import traderService from "../../../service/program-service";
import ProgramDepositContainer from "../../../../program-deposit/components/program-deposit-container/program-deposit-container";
import ProgramWithdrawContainer from "../../../../program-withdraw/components/program-withdraw-container/program-withdraw-container";

class TraderDetailContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchTraderDetail(this.props.programId);
  }

  render() {
    const {
      isAuthenticated,
      isPending,
      traderDetail,
      openInvestPopup,
      openWithdrawPopup
    } = this.props;
    if (isPending || traderDetail === undefined) {
      return <div>Loading statistic...</div>;
    }

    return (
      <TraderDetail
        trader={traderDetail}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
        openWithdrawPopup={openWithdrawPopup}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programData.traderDetail;

  let traderDetail;
  if (data) {
    traderDetail = data.investmentProgram;
  }

  return {
    isPending,
    traderDetail,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTraderDetail: programId => {
    dispatch(traderActions.fetchProgram(programId));
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  const closeInvestPopup = programId => () => {
    return traderService.updateAfterInvestment(programId);
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
          onSubmitPopup: closeInvestPopup(programId)
        })
      );
    },
    openWithdrawPopup: () => {
      const { traderDetail } = stateProps;
      const traderWithdraw = {
        id: traderDetail.id,
        title: traderDetail.title,
        logo: traderDetail.logo,
        level: traderDetail.level,
        startOfPeriod: traderDetail.startOfPeriod,
        endOfPeriod: traderDetail.endOfPeriod,
        investedTokens: traderDetail.investedTokens,
        token: traderDetail.token
      };
      const popupProps = {
        traderWithdraw
      };
      dispatch(
        popupActions.openPopup({
          component: ProgramWithdrawContainer,
          popupProps,
          onSubmitPopup: closeInvestPopup(popupProps.traderWithdraw.id)
        })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TraderDetailContainer);
