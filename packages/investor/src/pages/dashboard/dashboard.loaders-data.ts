import { DashboardChartValue } from "gv-api-web";
import { getRandomInteger } from "shared/utils/helpers";

export const DashboardChartValueLoaderData: DashboardChartValue = {
  investedProgramsInfo: [],
  balanceChart: [],
  value: getRandomInteger(0, 100),
  valueCurrency: getRandomInteger(0, 100),
  changePercent: getRandomInteger(0, 100),
  changeValue: getRandomInteger(0, 100),
  changeValueCurrency: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
};
