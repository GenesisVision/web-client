import { connect } from "react-redux";
import React, { PureComponent } from "react";

import traderActions from "../../../actions/program-actions";
import TraderHistory from "./trader-history/trader-history";

class TraderHistoryContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchTraderHistory(this.props.programId);
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
  const { isPending, errorMessage, data } = state.programData.history;
  const { data: traderDetail } = state.programData.traderDetail;

  let history;
  if (data) {
    history = data.chart;
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
  fetchTraderHistory: programId => {
    dispatch(traderActions.fetchProgramHistory(programId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TraderHistoryContainer);
