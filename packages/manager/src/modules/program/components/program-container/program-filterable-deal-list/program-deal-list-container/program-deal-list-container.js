import React, { PureComponent } from "react";
import { connect } from "react-redux";

import programService from "../../../../service/program-service";
import ProgramDealList from "./program-deal-list/trader-deal-list";

class ProgramDealListContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchProgramDealList(this.props.programId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.programId !== this.props.programId) {
      this.props.fetchProgramDealList(this.props.programId);
    }
  }

  render() {
    const { isPending, dealList, serverType, currency } = this.props;
    if (isPending || dealList === undefined) {
      return null;
    }

    return (
      <ProgramDealList
        deals={dealList}
        serverType={serverType}
        currency={currency}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programData.deals.items;
  const { data: programDetail } = state.programData.programDetail;

  let dealList, serverType, currency;
  if (data) {
    dealList = data.trades;
    serverType = data.tradeServerType;
  }

  if (programDetail && programDetail.investmentProgram) {
    currency = programDetail.investmentProgram.currency;
  }

  return {
    isPending,
    dealList,
    serverType,
    currency,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProgramDealList: programId => {
    dispatch(programService.getProgramDeals(programId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramDealListContainer
);
