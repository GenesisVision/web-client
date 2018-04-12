import { connect } from "react-redux";
import React, { PureComponent } from "react";

import traderActions from "../../../../actions/trader-actions";
import TraderDealList from "./trader-deal-list/trader-deal-list";

class TraderDealListContainer extends PureComponent {
  componentWillMount() {
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
  const { isPending, errorMessage, data } = state.traderData.deals.items;
  const { data: traderDetail } = state.traderData.traderDetail;

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
    dispatch(traderActions.fetchTraderDealList(programId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderDealListContainer
);
