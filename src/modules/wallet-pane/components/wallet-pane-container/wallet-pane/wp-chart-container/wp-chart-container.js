import { connect } from "react-redux";
import React, { Component } from "react";

import walletPaneActions from "../../../../actions/wallet-pane-actions";
import WPChart from "./wp-chart/wp-chart";

class WPChartContainer extends Component {
  componentWillMount() {
    this.props.fetchChart();
  }

  render() {
    const { chart, isPending } = this.props;
    if (isPending || !chart) {
      return <div>Loading...</div>;
    }

    return <WPChart data={chart} />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.walletPaneData.chart;

  let chart;
  if (data) {
    chart = data.chart;
  }
  return { isPending, chart };
};

const mapDispatchToProps = dispatch => ({
  fetchChart: () => {
    dispatch(walletPaneActions.fetchWalletPaneChart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WPChartContainer);
