import { DETAILS_CHART_TABS } from "components/details/details-statistic-section/details-chart-section/details-chart";
import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "components/details/details-statistic-section/details.chart.helpers";
import { fundAbsoluteProfitChartSelector } from "pages/invest/funds/fund-details/reducers/absolute-profit-chart.reducer";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../../actions/fund-details.actions";
import { fundBalanceChartSelector } from "../../reducers/balance-chart.reducer";
import { fundIdSelector } from "../../reducers/description.reducer";
import { fundProfitChartSelector } from "../../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";
import {
  getAbsoluteProfitChart,
  getBalanceChart,
  getProfitChart
} from "../../services/fund-details.service";

export const useFundChartStateData = (view: DETAILS_CHART_TABS) =>
  useChartStateDataCreator({
    view,
    statisticCurrencyAction,
    idSelector: fundIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    absoluteProfitChartSelector: fundAbsoluteProfitChartSelector,
    profitChartSelector: fundProfitChartSelector,
    balanceChartSelector: fundBalanceChartSelector,
    getBalanceChart,
    getAbsoluteProfitChart,
    getProfitChart
  });

export const useFundChartStateValues = (view: DETAILS_CHART_TABS) =>
  useFundChartStateValuesCreator(useFundChartStateData(view));

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);
