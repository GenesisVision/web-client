import "./program-details-chart-section.scss";

import ChartPeriod from "components/chart/chart-period/chart-period";
import StatisticItem from "components/statistic-item/statistic-item";
import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import ProgramProfitChart from "./program-profit-chart";

const PROFIT_TAB = "profit";
const BALANCE_TAB = "balance";
class ProgramDetailsChartSection extends PureComponent {
  state = {
    tab: PROFIT_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };
  render() {
    const { t, chart, totalProfit, changeValue } = this.props;
    const { tab } = this.state;

    return (
      <Surface className="program-details-chart">
        <div className="program-details-chart__heading">
          {t("program-details-page.chart.heading")}
        </div>
        <GVTabs value={tab} onChange={this.handleTabChange}>
          <GVTab
            value={PROFIT_TAB}
            label={t("program-details-page.chart.tabs.profit")}
          />
          <GVTab
            value={BALANCE_TAB}
            label={t("program-details-page.chart.tabs.balance")}
          />
        </GVTabs>
        <div>
          <StatisticItem
            heading={"Value"}
            value={totalProfit}
            equivalent={"???"}
            currency={"???"}
            className="program-details-chart__stat-item"
          />
          <StatisticItem
            heading={"Change"}
            value={changeValue}
            equivalent={"???"}
            currency={"???"}
            className="program-details-chart__stat-item"
          />
        </div>
        <ChartPeriod onChange={this.handleChangePeriod} />
        <div className="program-details-chart__profit">
          <ProgramProfitChart
            periods={chart.map(x => x.equityChart)}
            pnl={chart.pnLChart}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsChartSection);
