import { connect } from "react-redux";
import React, { PureComponent } from "react";

import programService from "../../../../service/program-service";
import TraderRequestList from "./trader-request-list/trader-request-list";

class TraderRequestListContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchTraderRequests(this.props.programId);
  }

  render() {
    const {
      isPending,
      traderRequests,
      cancelRequest,
      programId,
      token
    } = this.props;
    if (isPending || traderRequests === undefined) {
      return null;
    }
    return (
      <TraderRequestList
        requests={traderRequests.requests}
        token={token}
        cancelRequest={cancelRequest(programId)}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programData.requests.items;
  const { data: traderDetail } = state.programData.traderDetail;

  let traderRequests,
    token = {};
  if (data) {
    traderRequests = data;
  }

  if (traderDetail && traderDetail.investmentProgram) {
    token = traderDetail.investmentProgram.token;
  }

  return {
    isPending,
    traderRequests,
    token,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTraderRequests: programId => {
    dispatch(programService.getProgramRequests(programId));
  },
  cancelRequest: programId => requestId => () => {
    dispatch(programService.cancelProgramRequest(programId, requestId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderRequestListContainer
);
