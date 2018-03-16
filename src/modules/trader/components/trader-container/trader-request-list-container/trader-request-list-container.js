import { connect } from "react-redux";
import React, { PureComponent } from "react";

import traderActions from "../../../actions/trader-actions";
import TraderRequestList from "./trader-request-list/trader-request-list";

class TraderRequestListContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchTraderRequests(this.props.traderId);
  }

  render() {
    const { isPending, traderRequests, cancelRequest, traderId } = this.props;
    if (isPending || traderRequests === undefined) {
      return null;
    }
    return (
      <TraderRequestList
        requests={traderRequests.requests}
        cancelRequest={cancelRequest(traderId)}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderData.requests;

  let traderRequests;
  if (data) {
    traderRequests = data;
  }

  return {
    isPending,
    traderRequests,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTraderRequests: traderId => {
    dispatch(traderActions.fetchTraderRequests(traderId));
  },
  cancelRequest: traderId => requestId => () => {
    dispatch(traderActions.cancelRequest(requestId)).then(
      dispatch(traderActions.fetchTraderRequests(traderId))
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderRequestListContainer
);
