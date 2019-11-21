import { DETAILS_CHART_TABS } from "components/details/details-statistic-section/details-chart-section/details-chart";
import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "components/details/details-statistic-section/details.chart.helpers";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../actions/follow-details.actions";
import { followBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { followIdSelector } from "../reducers/description.reducer";
import { followProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../reducers/statistic-period.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../services/follow-details.service";

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);

export const useFollowChartStateData = (view: DETAILS_CHART_TABS) =>
  useChartStateDataCreator({
    view,
    statisticCurrencyAction,
    idSelector: followIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    profitChartSelector: followProfitChartSelector,
    balanceChartSelector: followBalanceChartSelector,
    getBalanceChart,
    getProfitChart
  });

export const useFollowChartStateValues = (view: DETAILS_CHART_TABS) =>
  useFundChartStateValuesCreator(useFollowChartStateData(view));
