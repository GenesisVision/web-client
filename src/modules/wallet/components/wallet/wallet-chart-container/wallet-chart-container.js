import { connect } from "react-redux";
import React, { PureComponent } from "react";

import WalletChart from "./wallet-chart/wallet-chart";
import walletService from "../../../service/wallet-service";

class WalletChartContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchWalletChart();
  }
  render() {
    const { isPending, chart } = this.props;
    if (isPending || chart === undefined) {
      return <div>Loading chart...</div>;
    }
    return <WalletChart data={chart.chart} />;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.walletData.chart;

  let chart;
  if (data) {
    chart = data;
  }
  return { isPending, chart, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchWalletChart: () => {
    dispatch(walletService.getWalletChart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletChartContainer
);
