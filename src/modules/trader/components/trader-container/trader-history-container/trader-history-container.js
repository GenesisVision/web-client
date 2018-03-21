import { connect } from "react-redux";
import React, { PureComponent } from "react";

import traderActions from "../../../actions/trader-actions";
import TraderHistory from "./trader-history/trader-history";

class TraderHistoryContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchTraderHistory(this.props.traderId);
  }

  render() {
    const { isPending, history } = this.props;
    if (isPending || history === undefined) {
      return null;
    }

    return <TraderHistory data={history} />;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderData.history;
  const { data: traderDetail } = state.traderData.traderDetail;

  let history;
  if (data) {
    history = data;
  }

  if (history && traderDetail && traderDetail.investmentProgram) {
    history = [
      {
        profit: 0,
        date: traderDetail.investmentProgram.programStartDate
      },
      ...history
    ];
  }

  return {
    isPending,
    history,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTraderHistory: traderId => {
    dispatch(traderActions.fetchTraderHistory(traderId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderHistoryContainer
);
