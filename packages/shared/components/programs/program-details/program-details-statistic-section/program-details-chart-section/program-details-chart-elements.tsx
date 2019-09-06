import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { ProgramBalanceChart, ProgramProfitChart } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useTab from "shared/hooks/tab.hook";
import { HandlePeriodChangeType } from "shared/utils/types";

import ProgramBalanceChartSection from "./program-balance-chart-section/program-balance-chart-section";
import ProgramProfitChartSection from "./program-profit-chart-section/program-profit-chart-section";

const _DetailsChartElements: React.FC<Props> = ({
  profitChart,
  balanceChart,
  period,
  onPeriodChange
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.PROFIT);
  return (
    <>
      <GVTabs value={tab} onChange={setTab}>
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
};

interface Props {
  profitChart: ProgramProfitChart;
  balanceChart: ProgramBalanceChart;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

enum TABS {
  PROFIT = "profit",
  EQUITY = "equity"
}

const ProgramDetailsChartElements = compose<
  React.ComponentType<Props & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_DetailsChartElements);
export default ProgramDetailsChartElements;
