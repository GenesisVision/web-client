import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import useTab from "shared/hooks/tab.hook";

import ProgramBalanceChartSection from "./program-balance-chart-section/program-balance-chart-section";
import ProgramProfitChartSection from "./program-profit-chart-section/program-profit-chart-section";

const _ProgramDetailsChart: React.FC = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.PROFIT);
  return (
    <Surface className="surface--horizontal-paddings details-chart">
      <h3>{t("program-details-page.chart.heading")}</h3>
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
      {tab === TABS.PROFIT && <ProgramProfitChartSection />}
      {tab === TABS.EQUITY && <ProgramBalanceChartSection />}
    </Surface>
  );
};

enum TABS {
  PROFIT = "profit",
  EQUITY = "equity"
}

const ProgramDetailsChart = React.memo(_ProgramDetailsChart);
export default ProgramDetailsChart;
