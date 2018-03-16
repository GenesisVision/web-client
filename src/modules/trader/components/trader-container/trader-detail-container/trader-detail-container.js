import { connect } from "react-redux";
import React, { PureComponent } from "react";

import TraderDetail from "./trader-detail/trader-detail";
import traderActions from "../../../actions/trader-actions";
import popupActions from "../../../../popup/actions/popup-actions";
import { TRADER_DEPOSIT_POPUP } from "../../../../popup/actions/popup-actions.constants";

class TraderDetailContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchTraderDetail(this.props.traderId);
  }

  render() {
    const {
      isAuthenticated,
      isPending,
      traderDetail,
      openInvestPopup
    } = this.props;
    if (isPending || traderDetail === undefined) {
      return <div>Loading statistic...</div>;
    }
    return (
      <TraderDetail
        trader={traderDetail.investmentProgram}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderData.traderDetail;

  let traderDetail;
  if (data) {
    traderDetail = data;
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderDetailContainer
);
