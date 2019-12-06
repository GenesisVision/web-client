import { DETAILS_CHART_TABS } from "components/details/details-statistic-section/details-chart-section/details-chart";
import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "components/details/details-statistic-section/details.chart.helpers";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../actions/account-details.actions";
import { accountBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { accountIdSelector } from "../reducers/description.reducer";
import { accountProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../reducers/statistic-period.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../services/account-details.service";

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);

export const useAccountChartStateData = (view: DETAILS_CHART_TABS) =>
  useChartStateDataCreator({
    view,
    statisticCurrencyAction,
    idSelector: accountIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    profitChartSelector: accountProfitChartSelector,
    balanceChartSelector: accountBalanceChartSelector,
    getBalanceChart,
    getProfitChart
  });

export const useAccountChartStateValues = (view: DETAILS_CHART_TABS) =>
  useFundChartStateValuesCreator(useAccountChartStateData(view));
