import "./program-details-chart-section.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import ProgramProfitChartSection from "./program-profit-chart-section/program-profit-chart-section";

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
    const {
      t,
      period,
      onPeriodChange,
      profitChartData,
      totalProfit,
      changeValue
    } = this.props;

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
        {tab === PROFIT_TAB && (
          <ProgramProfitChartSection
            profitChartData={profitChartData}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsChartSection);
