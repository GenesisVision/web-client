import { connect } from "react-redux";
import React, { PureComponent } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import traderActions from "../../../actions/trader-actions";
import TraderDetail from "./trader-detail/trader-detail";

import {
  PROGRAM_DEPOSIT_POPUP,
  TRADER_WITHDRAW_POPUP
} from "../../../../popup/actions/popup-actions.constants";
import traderService from "../../../service/trader-service";

class TraderDetailContainer extends PureComponent {
  componentWillMount() {
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
  const { isPending, errorMessage, data } = state.traderData.traderDetail;

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
    dispatch(traderActions.fetchTrader(programId));
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
        popupActions.openPopup(
          PROGRAM_DEPOSIT_POPUP,
          {
            programId
          },
          closeInvestPopup(programId)
        )
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
        periodDuration: traderDetail.periodDuration,
        investedTokens: traderDetail.investedTokens,
        token: traderDetail.token
      };
      const popupProps = {
        traderWithdraw
      };
      dispatch(
        popupActions.openPopup(
          TRADER_WITHDRAW_POPUP,
          popupProps,
          closeInvestPopup(popupProps.traderWithdraw.id)
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  TraderDetailContainer
);
