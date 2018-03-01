import { connect } from "react-redux";
import React, { Component } from "react";

import Trader from "./trader/trader";
import tradersActions from "../../actions/traders-actions";

class TraderContainer extends Component {
  componentWillMount() {
    const { traderId } = this.props.match.params;
    this.props.fetchTrader(traderId);
  }
  render() {
    const { isPending, trader } = this.props;

    if (isPending || trader === undefined) {
      return null;
    }

    return <Trader trader={trader.investmentProgram} />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.traderData;
  return { isPending, trader: data };
};

const mapDispatchToProps = dispatch => ({
  fetchTrader: traderId => {
    dispatch(tradersActions.fetchTrader(traderId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TraderContainer);
