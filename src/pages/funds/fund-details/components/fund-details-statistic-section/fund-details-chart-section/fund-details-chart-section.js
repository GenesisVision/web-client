import "./fund-details-chart-section.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import ProgramBalanceChartSection from "./fund-balance-chart-section/fund-profit-chart-section";
import FundProfitChartSection from "./fund-profit-chart-section/fund-profit-chart-section";

const PROFIT_TAB = "profit";
const BALANCE_TAB = "balance";
class FundDetailsChartSection extends PureComponent {
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
      balanceChartData
    } = this.props;

    const { tab } = this.state;

    return (
      <Surface className="fund-details-chart">
        <div className="fund-details-chart__heading">
          {t("fund-details-page.chart.heading")}
        </div>
        <GVTabs value={tab} onChange={this.handleTabChange}>
          <GVTab
            value={PROFIT_TAB}
            label={t("fund-details-page.chart.tabs.profit")}
          />
          <GVTab
            value={BALANCE_TAB}
            label={t("fund-details-page.chart.tabs.balance")}
          />
        </GVTabs>
        {tab === PROFIT_TAB && (
          <FundProfitChartSection
            profitChartData={profitChartData}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
        {tab === BALANCE_TAB && (
          <ProgramBalanceChartSection
            balanceChartData={balanceChartData}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </Surface>
    );
  }
}

export default translate()(FundDetailsChartSection);
