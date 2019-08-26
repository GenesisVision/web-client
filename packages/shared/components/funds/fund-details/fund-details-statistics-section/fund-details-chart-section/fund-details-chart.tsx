import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import useTab from "shared/hooks/tab.hook";

import FundBalanceChartSection from "./fund-balance-chart-section/fund-balance-chart-section";
import FundProfitChartSection from "./fund-profit-chart-section/fund-profit-chart-section";

const _FundDetailsChart: React.FC = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.PROFIT);
  return (
    <Surface className="surface--horizontal-paddings details-chart">
      <h3>{t("fund-details-page.chart.heading")}</h3>
      <GVTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.PROFIT}
          label={t("fund-details-page.chart.tabs.profit")}
        />
        <GVTab
          value={TABS.BALANCE}
          label={t("fund-details-page.chart.tabs.balance")}
        />
      </GVTabs>
      {tab === TABS.PROFIT && <FundProfitChartSection />}
      {tab === TABS.BALANCE && <FundBalanceChartSection />}
    </Surface>
  );
};

enum TABS {
  PROFIT = "profit",
  BALANCE = "balance"
}

const FundDetailsChart = React.memo(_FundDetailsChart);
export default FundDetailsChart;
