import React, { PureComponent } from "react";
import { connect } from "react-redux";

import programService from "../../../../service/program-service";
import ProgramRequestList from "./program-request-list/program-request-list";

class ProgramRequestListContainer extends PureComponent {
  fetchTraderRequests = () => {
    const {
      isOwnProgram,
      isPending,
      programRequests,
      errorMessage,
      programId,
      fetchTraderRequests
    } = this.props;
    if (isOwnProgram && !isPending && !errorMessage && !programRequests) {
      fetchTraderRequests(programId);
    }
  };

  componentDidMount() {
    this.fetchTraderRequests(this.props.programId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.programId !== this.props.programId) {
      this.fetchTraderRequests(this.props.programId);
    }
  }

  render() {
    const {
      isOwnProgram,
      isPending,
      programRequests,
      cancelRequest,
      programId,
      currency
    } = this.props;
    if (!isOwnProgram || isPending || programRequests === undefined) {
      return null;
    }
    return (
      <ProgramRequestList
        requests={programRequests.requests}
        currency={currency}
        cancelRequest={cancelRequest(programId)}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programData.requests.items;
  const { data: programDetail } = state.programData.programDetail;

  let programRequests, isOwnProgram, currency;
  if (data) {
    programRequests = data;
  }

  if (programDetail && programDetail.investmentProgram) {
    currency = programDetail.investmentProgram.currency;
    isOwnProgram = programDetail.investmentProgram.isOwnProgram;
  }

  return {
    isPending,
    programRequests,
    currency,
    isOwnProgram,
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
  ProgramRequestListContainer
);
