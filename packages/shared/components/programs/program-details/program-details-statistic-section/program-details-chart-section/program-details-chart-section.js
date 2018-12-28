import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import Surface from "shared/components/surface/surface";

import ProgramBalanceChartSection from "./program-balance-chart-section/program-balance-chart-section";
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
    const { t, period, onPeriodChange, profitChart, balanceChart } = this.props;

    const { tab } = this.state;

    const renderDetailsChart = () => (
      <Fragment>
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
            profitChart={profitChart}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
        {tab === BALANCE_TAB && (
          <ProgramBalanceChartSection
            balanceChart={balanceChart}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </Fragment>
    );

    return (
      <Surface className="surface--horizontal-paddings details-chart">
        <h3>{t("program-details-page.chart.heading")}</h3>
        {!profitChart && !balanceChart ? (
          <DetailsChartLoader />
        ) : (
          renderDetailsChart()
        )}
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsChartSection);
