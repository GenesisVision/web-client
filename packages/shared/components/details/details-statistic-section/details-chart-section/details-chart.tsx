import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import useTab from "shared/hooks/tab.hook";

import BalanceChartSection, {
  IBalanceChartSectionProps
} from "./balance-chart-section/balance-chart-section";
import ProfitChartSection, {
  IProfitChartSectionProps
} from "./profit-chart-section/profit-chart-section";

const _DetailsChart: React.FC<IDetailsChartProps> = ({
  useChartStateValues,
  useChartPeriod,
  balanceChartSelector,
  renderBalanceChart,
  renderProfitChart,
  profitChartSelector,
  renderProfitValue
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.PROFIT);
  return (
    <DetailsBlock horizontalPaddings className="details-chart">
      <h3>{t("details-page.chart.heading")}</h3>
      <GVTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.PROFIT}
          label={t("details-page.chart.tabs.profit")}
        />
        <GVTab
          value={TABS.BALANCE}
          label={t("details-page.chart.tabs.balance")}
        />
      </GVTabs>
      {tab === TABS.PROFIT && (
        <ProfitChartSection
          renderProfitChart={renderProfitChart}
          profitChartSelector={profitChartSelector}
          renderProfitValue={renderProfitValue}
          useChartStateValues={useChartStateValues}
          useChartPeriod={useChartPeriod}
        />
      )}
      {tab === TABS.BALANCE && (
        <BalanceChartSection
          useChartStateValues={useChartStateValues}
          useChartPeriod={useChartPeriod}
          balanceChartSelector={balanceChartSelector}
          renderBalanceChart={renderBalanceChart}
        />
      )}
    </DetailsBlock>
  );
};

enum TABS {
  PROFIT = "profit",
  BALANCE = "balance"
}

export interface IDetailsChartProps
  extends IBalanceChartSectionProps,
    IProfitChartSectionProps {}

const DetailsChart = React.memo(_DetailsChart);
export default DetailsChart;
