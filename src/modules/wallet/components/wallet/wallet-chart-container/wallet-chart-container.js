import { connect } from "react-redux";
import React, { PureComponent } from "react";
import WalletChart from "./wallet-chart/wallet-chart";
import walletActions from "../../../actions/wallet-actions";

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
  if (errorMessage !== "") {
    chart = [];
  }
  return { isPending, chart, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  fetchWalletChart: () => {
    dispatch(walletActions.fetchWalletChart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletChartContainer
);
