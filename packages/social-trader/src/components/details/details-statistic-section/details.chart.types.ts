import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { DETAILS_CHART_TABS } from "components/details/details-statistic-section/details-chart-section/details-chart";
import { TStatisticCurrencyAction } from "components/details/reducers/statistic-currency.reducer";
import {
  StatisticPeriodState,
  TStatisticPeriodAction
} from "components/details/reducers/statistic-period.reducer";
import {
  AbsoluteProfitChart,
  AccountChartStatistic,
  AccountProfitPercentCharts,
  BalanceChartPoint,
  FundAssetsState,
  FundBalanceChart,
  FundChartStatistic,
  FundProfitPercentCharts,
  ProgramBalanceChart,
  ProgramChartStatistic,
  ProgramProfitPercentCharts,
  SimpleChart,
  SimpleChartPoint
} from "gv-api-web";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector";
import { FundBalanceChartDataType } from "pages/invest/funds/fund-details/reducers/balance-chart.reducer";
import { ProgramBalanceChartDataType } from "pages/invest/programs/program-details/program-details.types";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { TSelectorData } from "utils/selectors";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

export type ChartAssetsType = FundAssetsState[];

export type TBalanceChartSelector = (
  state: RootState
) => TSelectorData<BalanceChartDataType>;

export type TUseChartPeriod = () => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};
export type TUseChartStateValues = (
  view: DETAILS_CHART_TABS
) => TUseChartStateValuesOutput;

export type TStatisticCurrencySelector = (state: RootState) => CurrencyEnum;

export type TProfitChartSelector = (
  state: RootState
) => TSelectorData<ProfitChartDataType>;

export type TAbsoluteProfitChartSelector = (
  state: RootState
) => TSelectorData<AbsoluteProfitChartDataType>;

export type TUseChartStateValuesOutput = {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
};

export type TUseChartPeriodCreator = (
  selector: (state: RootState) => StatisticPeriodState,
  action: (period: ChartDefaultPeriod) => TStatisticPeriodAction
) => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};

export type TChartData<T> = {
  chart: T;
  selectedCurrencies: TChartCurrency[];
};

export interface TGetChartArgs {
  currencies: CurrencyEnum[];
  id: string;
  period?: ChartDefaultPeriod;
}

export type ProfitChartType =
  | FundProfitPercentCharts
  | ProgramProfitPercentCharts
  | AccountProfitPercentCharts;

export type AbsoluteProfitChartType = AbsoluteProfitChart;
export type ProfitChartDataType = ProfitChartType;
export type AbsoluteProfitChartDataType = AbsoluteProfitChartType;
export type StatisticDataType =
  | ProgramChartStatistic
  | FundChartStatistic
  | AccountChartStatistic;
export type ChartsDataType = Array<SimpleChart>;
export type ChartDataType = Array<SimpleChartPoint>;

export type BalanceChartElementType = Array<BalanceChartPoint>;
export type BalanceChartType = FundBalanceChart | ProgramBalanceChart;
export type BalanceChartDataType =
  | FundBalanceChartDataType
  | ProgramBalanceChartDataType;

export type TGetChartFunc = (
  props: TGetChartArgs
) => (dispatch: Dispatch) => void;

export type TUseFundChartStateDataMethods = {
  statisticCurrencyAction: (currency: CurrencyEnum) => TStatisticCurrencyAction;
  platformCurrencies: TChartCurrency[];
  absoluteProfitChart?: AbsoluteProfitChartDataType;
  profitChart?: ProfitChartDataType;
  balanceChart?: BalanceChartType;
  selectedCurrencies: TChartCurrency[];
  setSelectedCurrencies: (currencies: TChartCurrency[]) => void;
};
export type TUseFundChartStateDataCreator = (props: {
  view: DETAILS_CHART_TABS;
  statisticCurrencyAction: (currency: CurrencyEnum) => TStatisticCurrencyAction;
  profitChartSelector: (state: RootState) => TSelectorData<ProfitChartDataType>;
  absoluteProfitChartSelector: (
    state: RootState
  ) => TSelectorData<AbsoluteProfitChartDataType>;
  balanceChartSelector: (state: RootState) => TSelectorData<BalanceChartType>;
  statisticCurrencySelector: (state: RootState) => CurrencyEnum;
  idSelector: (state: RootState) => string;
  statisticPeriodSelector: (state: RootState) => ChartDefaultPeriod;
  getBalanceChart: TGetChartFunc;
  getProfitChart: TGetChartFunc;
  getAbsoluteProfitChart: TGetChartFunc;
}) => TUseFundChartStateDataMethods;

export type TUseFundChartStateValuesCreator = (
  useFundChartStateData: TUseFundChartStateDataMethods
) => TUseChartStateValuesOutput;
