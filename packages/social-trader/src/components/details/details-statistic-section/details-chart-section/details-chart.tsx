import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import "components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";
import AbsoluteProfitChartSection, {
  IAbsoluteProfitChartSectionProps
} from "components/details/details-statistic-section/details-chart-section/absolute-profit-chart-section/absolute-profit-chart-section";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";

import BalanceChartSection, {
  IBalanceChartSectionProps
} from "./balance-chart-section/balance-chart-section";
import ProfitChartSection, {
  IProfitChartSectionProps
} from "./profit-chart-section/profit-chart-section";

export enum DETAILS_CHART_TABS {
  ABSOLUTE_PROFIT = "absolute-profit",
  PROFIT = "profit",
  BALANCE = "balance"
}

const _DetailsChart: React.FC<IDetailsChartProps> = ({
  renderAbsoluteProfitChart,
  absoluteProfitChartSelector,
  loaderData,
  useChartStateValues,
  useChartPeriod,
  balanceChartSelector,
  renderBalanceChart,
  renderProfitChart,
  profitChartSelector,
  renderProfitValue
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<DETAILS_CHART_TABS>(DETAILS_CHART_TABS.PROFIT);
  return (
    <DetailsBlock className="details-chart">
      <DetailsBlockTitleBox>
        <h3>{t("details-page.chart.heading")}</h3>
      </DetailsBlockTitleBox>
      <Row>
        <DetailsBlockTabs value={tab} onChange={setTab}>
          <GVTab
            value={DETAILS_CHART_TABS.PROFIT}
            label={t("details-page.chart.tabs.profit")}
          />
          <GVTab
            value={DETAILS_CHART_TABS.ABSOLUTE_PROFIT}
            label={t("details-page.chart.tabs.absolute-profit")}
          />
          <GVTab
            value={DETAILS_CHART_TABS.BALANCE}
            label={t("details-page.chart.tabs.balance")}
          />
        </DetailsBlockTabs>
      </Row>
      <Row onlyOffset className="details-chart__container">
        {tab === DETAILS_CHART_TABS.PROFIT && (
          <ProfitChartSection
            loaderData={loaderData}
            renderProfitChart={renderProfitChart}
            profitChartSelector={profitChartSelector}
            renderProfitValue={renderProfitValue}
            useChartStateValues={useChartStateValues}
            useChartPeriod={useChartPeriod}
          />
        )}
        {tab === DETAILS_CHART_TABS.ABSOLUTE_PROFIT && (
          <AbsoluteProfitChartSection
            loaderData={loaderData}
            renderAbsoluteProfitChart={renderAbsoluteProfitChart}
            absoluteProfitChartSelector={absoluteProfitChartSelector}
            renderProfitValue={renderProfitValue}
            useChartStateValues={useChartStateValues}
            useChartPeriod={useChartPeriod}
          />
        )}
        {tab === DETAILS_CHART_TABS.BALANCE && (
          <BalanceChartSection
            useChartStateValues={useChartStateValues}
            useChartPeriod={useChartPeriod}
            balanceChartSelector={balanceChartSelector}
            renderBalanceChart={renderBalanceChart}
          />
        )}
      </Row>
    </DetailsBlock>
  );
};

export interface IDetailsChartProps
  extends IBalanceChartSectionProps,
    IProfitChartSectionProps,
    IAbsoluteProfitChartSectionProps {}

const DetailsChart = React.memo(_DetailsChart);
export default DetailsChart;
