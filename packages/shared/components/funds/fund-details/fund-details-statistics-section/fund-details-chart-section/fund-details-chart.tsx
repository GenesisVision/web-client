import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { FundBalanceChart as FundBalanceChartType } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import Surface from "shared/components/surface/surface";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundProfitChartDataType } from "../../reducers/profit-chart.reducer";
import FundDetailsChartElements from "./fund-details-chart-elements";

const _FundDetailsChart: React.FC<Props> = ({
  chartCurrencies,
  addChartCurrency,
  removeChartCurrency,
  changeChartCurrency,
  t,
  period,
  onPeriodChange,
  profitChart,
  balanceChart
}) => (
  <Surface className="surface--horizontal-paddings details-chart">
    <h3>{t("fund-details-page.chart.heading")}</h3>
    <FundDetailsChartElements
      condition={!!profitChart && !!balanceChart}
      chartCurrencies={chartCurrencies}
      addChartCurrency={addChartCurrency}
      removeChartCurrency={removeChartCurrency}
      changeChartCurrency={changeChartCurrency}
      loader={<DetailsChartLoader />}
      profitChart={profitChart!}
      balanceChart={balanceChart!}
      period={period}
      onPeriodChange={onPeriodChange}
    />
  </Surface>
);

interface Props extends WithTranslation {
  chartCurrencies: TChartCurrency[];
  addChartCurrency: TAddChartCurrency;
  removeChartCurrency: TRemoveChartCurrency;
  changeChartCurrency: TChangeChartCurrency;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
  profitChart?: FundProfitChartDataType;
  balanceChart?: FundBalanceChartType;
}

const FundDetailsChart = translate()(React.memo(_FundDetailsChart));
export default FundDetailsChart;
