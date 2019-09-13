import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "shared/components/details/details-statistic-section/details.chart.helpers";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../../actions/program-details.actions";
import { programBalanceChartSelector } from "../../reducers/balance-chart.reducer";
import { programIdSelector } from "../../reducers/description.reducer";
import { programProfitChartSelector } from "../../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../../services/program-details.service";

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);

export const useProgramChartStateData = () =>
  useChartStateDataCreator({
    statisticCurrencyAction,
    idSelector: programIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    profitChartSelector: programProfitChartSelector,
    balanceChartSelector: programBalanceChartSelector,
    getBalanceChart,
    getProfitChart
  });

export const useProgramChartStateValues = () =>
  useFundChartStateValuesCreator(useProgramChartStateData);
