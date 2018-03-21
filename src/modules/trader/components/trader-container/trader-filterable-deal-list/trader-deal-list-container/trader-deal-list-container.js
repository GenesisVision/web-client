import { connect } from "react-redux";
import React, { PureComponent } from "react";

import traderActions from "../../../../actions/trader-actions";
import TraderDealList from "./trader-deal-list/trader-deal-list";

class TraderDealListContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchTraderDealList(this.props.traderId);
  }

  render() {
    const { isPending, dealList, serverType } = this.props;
    if (isPending || dealList === undefined) {
      return null;
    }

    return <TraderDealList deals={dealList} serverType={serverType} />;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.traderData.deals.items;

  let dealList, serverType;
  if (data) {
    dealList = data.trades;
    serverType = data.serverType;
  }

  return {
    isPending,
    dealList,
    serverType,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTraderDealList: traderId => {
    dispatch(traderActions.fetchTraderDealList(traderId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderDealListContainer
);
