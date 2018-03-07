import { connect } from "react-redux";
import React, { Component } from "react";

import Trader from "./trader/trader";
import TraderRequestList from "./trader-request-list/trader-request-list";
import tradersActions from "../../actions/traders-actions";

class TraderContainer extends Component {
  componentWillMount() {
    const { traderId } = this.props.match.params;
    const { isAuthenticated } = this.props;
    this.props.fetchTrader(traderId);
    if (isAuthenticated) {
      this.props.fetchTraderRequests(traderId);
    }
  }

  renderTrader = () => {
    const { isPendingTrader, trader } = this.props;
    if (isPendingTrader || trader === undefined) {
      return null;
    }
    return <Trader trader={trader.investmentProgram} />;
  };

  renderTraderRequests = () => {
    const { traderId } = this.props.match.params;
    const {
      isPendingTraderRequests,
      traderRequests,
      cancelRequest
    } = this.props;
    if (isPendingTraderRequests || traderRequests === undefined) {
      return null;
    }
    return (
      <TraderRequestList
        requests={traderRequests.requests}
        cancelRequest={cancelRequest(traderId)}
      />
    );
  };

  render() {
    return (
      <div className="container-fluid">
        {this.renderTrader()}
        {this.renderTraderRequests()}
        {this.props.errorMessage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isPending: isPendingTrader,
    errorMessage: errorMessageTraders,
    data: trader
  } = state.traderData.traders;

  const {
    isPending: isPendingTraderRequests,
    errorMessage: errorMessageTraderRequests,
    data: traderRequests
  } = state.traderData.requests;

  const { isAuthenticated } = state.authData;

  return {
    isAuthenticated,
    isPendingTrader,
    trader,
    isPendingTraderRequests,
    traderRequests,
    errorMessage: errorMessageTraders || errorMessageTraderRequests
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTrader: traderId => {
    dispatch(tradersActions.fetchTrader(traderId));
  },
  fetchTraderRequests: traderId => {
    dispatch(tradersActions.fetchTraderRequests(traderId));
  },
  cancelRequest: traderId => requestId => () => {
    dispatch(tradersActions.cancelRequest(requestId)).then(
      dispatch(tradersActions.fetchTraderRequests(traderId))
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TraderContainer);
