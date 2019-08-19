import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import {
  FundBalanceChart as FundBalanceChartType,
  FundProfitChart
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useTab from "shared/hooks/tab.hook";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundProfitChartDataType } from "../../reducers/profit-chart.reducer";
import FundBalanceChartSection from "./fund-balance-chart-section/fund-balance-chart-section";
import FundProfitChartSection from "./fund-profit-chart-section/fund-profit-chart-section";

const _FundDetailsChartSection: React.FC<Props> = ({
  chartCurrencies,
  addChartCurrency,
  removeChartCurrency,
  changeChartCurrency,
  t,
  period,
  onPeriodChange,
  profitChart,
  balanceChart
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.PROFIT);
  return (
    <>
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
      {tab === TABS.PROFIT && (
        <FundProfitChartSection
          chartCurrencies={chartCurrencies}
          addChartCurrency={addChartCurrency}
          removeChartCurrency={removeChartCurrency}
          changeChartCurrency={changeChartCurrency}
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
};

enum TABS {
  PROFIT = "profit",
  BALANCE = "balance"
}

interface OwnProps {
  chartCurrencies: TChartCurrency[];
  addChartCurrency: TAddChartCurrency;
  removeChartCurrency: TRemoveChartCurrency;
  changeChartCurrency: TChangeChartCurrency;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
  profitChart: FundProfitChartDataType;
  balanceChart: FundBalanceChartType;
}

interface Props extends WithTranslation, OwnProps {}

const FundDetailsChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_FundDetailsChartSection);
export default FundDetailsChartElements;
