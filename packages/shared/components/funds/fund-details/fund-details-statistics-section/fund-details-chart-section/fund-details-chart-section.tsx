import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { FundBalanceChart as FundBalanceChartType } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundDetailsProfitChart } from "../../services/fund-details.types";
import FundBalanceChartSection from "./fund-balance-chart-section/fund-balance-chart-section";
import FundProfitChartSection from "./fund-profit-chart-section/fund-profit-chart-section";

class FundDetailsChartSection extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.PROFIT
  };

  handleTabChange = (e: React.SyntheticEvent<EventTarget>, tab: string) =>
    this.setState({ tab: tab as TABS });

  render() {
    const { t, period, onPeriodChange, profitChart, balanceChart } = this.props;
    const { tab } = this.state;
    const renderDetailsChart = () => (
      <>
        <GVTabs value={tab} onChange={this.handleTabChange}>
          <GVTab
            value={TABS.PROFIT}
            label={t("fund-details-page.chart.tabs.profit")}
          />
          <GVTab
            value={TABS.BALANCE}
            label={t("fund-details-page.chart.tabs.balance")}
          />
        </GVTabs>
        {tab === TABS.PROFIT && (
          <FundProfitChartSection
            profitChart={profitChart!}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
        {tab === TABS.BALANCE && (
          <FundBalanceChartSection
            balanceChart={balanceChart!}
            period={period}
            onPeriodChange={onPeriodChange}
          />
        )}
      </>
    );

    return (
      <Surface className="surface--horizontal-paddings details-chart">
        <h3>{t("fund-details-page.chart.heading")}</h3>
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
  BALANCE = "balance"
}

interface Props extends InjectedTranslateProps {
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChartType;
}
interface State {
  tab: TABS;
}

export default translate()(FundDetailsChartSection);
