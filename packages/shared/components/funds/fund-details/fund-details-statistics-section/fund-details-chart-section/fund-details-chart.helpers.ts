import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "shared/components/details/details-statistic-section/details.chart.helpers";

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
  getBalanceChart,
  getProfitChart
} from "../../services/fund-details.service";

export const useFundChartStateData = () =>
  useChartStateDataCreator({
    statisticCurrencyAction,
    idSelector: fundIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    profitChartSelector: fundProfitChartSelector,
    balanceChartSelector: fundBalanceChartSelector,
    getBalanceChart,
    getProfitChart
  });

export const useFundChartStateValues = () =>
  useFundChartStateValuesCreator(useFundChartStateData);

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);
