import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { ProgramBalanceChart } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import withLoader from "shared/decorators/with-loader";
import { HandlePeriodChangeType } from "shared/utils/types";

import { ProgramDetailsProfitChart } from "../../services/program-details.types";
import ProgramBalanceChartSection from "./program-balance-chart-section/program-balance-chart-section";
import ProgramProfitChartSection from "./program-profit-chart-section/program-profit-chart-section";

class _DetailsChart extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.PROFIT
  };

  handleTabChange = (e: React.SyntheticEvent<EventTarget>, tab: string) =>
    this.setState({ tab: tab as TABS });

  render() {
    const { t, profitChart, balanceChart, period, onPeriodChange } = this.props;
    const { tab } = this.state;
    return (
      <>
        <GVTabs value={tab} onChange={this.handleTabChange}>
          <GVTab
            value={TABS.PROFIT}
            label={t("program-details-page.chart.tabs.profit")}
          />
          <GVTab
            value={TABS.EQUITY}
            label={t("program-details-page.chart.tabs.equity")}
          />
        </GVTabs>
        {tab === TABS.PROFIT && (
          <ProgramProfitChartSection
            profitChart={profitChart}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
        {tab === TABS.EQUITY && (
          <ProgramBalanceChartSection
            balanceChart={balanceChart}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </>
    );
  }
}

interface Props extends InjectedTranslateProps {
  profitChart: ProgramDetailsProfitChart;
  balanceChart: ProgramBalanceChart;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

enum TABS {
  PROFIT = "profit",
  EQUITY = "equity"
}

interface State {
  tab: TABS;
}

export const DetailsChart = withLoader(translate()(_DetailsChart));
