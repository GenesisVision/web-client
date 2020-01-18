import { DETAILS_CHART_TABS } from "components/details/details-statistic-section/details-chart-section/details-chart";
import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "components/details/details-statistic-section/details.chart.helpers";
import { programAbsoluteProfitChartSelector } from "pages/invest/programs/program-details/reducers/absolute-profit-chart.reducer";

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
  getAbsoluteProfitChart,
  getBalanceChart,
  getProfitChart
} from "../../service/program-details.service";

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);

export const useProgramChartStateData = (view: DETAILS_CHART_TABS) =>
  useChartStateDataCreator({
    view,
    statisticCurrencyAction,
    idSelector: programIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    absoluteProfitChartSelector: programAbsoluteProfitChartSelector,
    profitChartSelector: programProfitChartSelector,
    balanceChartSelector: programBalanceChartSelector,
    getBalanceChart,
    getAbsoluteProfitChart,
    getProfitChart
  });

export const useProgramChartStateValues = (view: DETAILS_CHART_TABS) =>
  useFundChartStateValuesCreator(useProgramChartStateData(view));
