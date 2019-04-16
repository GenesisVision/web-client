import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { ProgramBalanceChart } from "gv-api-web";
import { GVTab, GVTabs } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import Surface from "shared/components/surface/surface";

import { ProgramDetailsProfitChart } from "../../services/program-details.types";
import { HandlePeriodChangeType } from "../program-details-statistic-section";
import ProgramBalanceChartSection from "./program-balance-chart-section/program-balance-chart-section";
import ProgramProfitChartSection from "./program-profit-chart-section/program-profit-chart-section";

class ProgramDetailsChartSection extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.PROFIT
  };

  handleTabChange = (e: React.SyntheticEvent<EventTarget>, tab: string) => {
    this.setState({ tab: tab as TABS });
  };
  render() {
    const { t, period, onPeriodChange, profitChart, balanceChart } = this.props;
    const { tab } = this.state;
    const renderDetailsChart = () => (
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
        {tab === TABS.PROFIT && profitChart && (
          <ProgramProfitChartSection
            profitChart={profitChart}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
        {tab === TABS.EQUITY && balanceChart && (
          <ProgramBalanceChartSection
            balanceChart={balanceChart}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </>
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

enum TABS {
  PROFIT = "profit",
  EQUITY = "equity"
}

interface Props extends InjectedTranslateProps {
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
}
interface State {
  tab: TABS;
}

export default translate()(ProgramDetailsChartSection);
