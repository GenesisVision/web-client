import { connect } from "react-redux";
import React, { PureComponent } from "react";

import TraderDealList from "./trader-deal-list/trader-deal-list";
import programService from "../../../../service/program-service";

class TraderDealListContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchTraderDealList(this.props.programId);
  }

  render() {
    const { isPending, dealList, serverType, currency } = this.props;
    if (isPending || dealList === undefined) {
      return null;
    }

    return (
      <TraderDealList
        deals={dealList}
        serverType={serverType}
        currency={currency}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programData.deals.items;
  const { data: traderDetail } = state.programData.traderDetail;

  let dealList, serverType, currency;
  if (data) {
    dealList = data.trades;
    serverType = data.tradeServerType;
  }

  if (traderDetail && traderDetail.investmentProgram) {
    currency = traderDetail.investmentProgram.currency;
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
  fetchTraderDealList: programId => {
    dispatch(programService.getProgramDeals(programId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TraderDealListContainer);
