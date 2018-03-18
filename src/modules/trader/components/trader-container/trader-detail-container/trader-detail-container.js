import { connect } from "react-redux";
import React, { PureComponent } from "react";

import popupActions from "../../../../popup/actions/popup-actions";
import traderActions from "../../../actions/trader-actions";
import TraderDetail from "./trader-detail/trader-detail";

import {
  TRADER_DEPOSIT_POPUP,
  TRADER_WITHDRAW_POPUP
} from "../../../../popup/actions/popup-actions.constants";

class TraderDetailContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchTraderDetail(this.props.traderId);
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

    const handleOpenWithdrawPopup = traderId => () => {
      const traderWithdraw = {
        id: traderId,
        title: traderDetail.title,
        logo: traderDetail.logo,
        level: traderDetail.level,
        startOfPeriod: traderDetail.startOfPeriod,
        periodDuration: traderDetail.periodDuration,
        investedTokens: traderDetail.investedTokens,
        currency: traderDetail.currency
      };
      const popupProps = {
        traderWithdraw
      };
      return openWithdrawPopup(popupProps);
    };

    return (
      <TraderDetail
        trader={traderDetail}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
        openWithdrawPopup={handleOpenWithdrawPopup}
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
  fetchTraderDetail: traderId => {
    dispatch(traderActions.fetchTrader(traderId));
  },
  openInvestPopup: traderId => () => {
    dispatch(popupActions.openPopup(TRADER_DEPOSIT_POPUP, { traderId }));
  },
  openWithdrawPopup: popupProps => {
    dispatch(popupActions.openPopup(TRADER_WITHDRAW_POPUP, popupProps));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderDetailContainer
);
