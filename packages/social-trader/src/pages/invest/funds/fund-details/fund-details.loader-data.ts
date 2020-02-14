import { mockDate } from "components/details/details.loader-data";
import { getRandomInteger } from "utils/helpers";

import { IFundStatisticData } from "./fund-details-statistics-section/fund-details-statistics/fund-details-statistics-elements";

export const fundStatisticLoaderData = {
  creationDate: mockDate,
  profitPercent: getRandomInteger(0, 100),
  equityChart: [],
  balance: getRandomInteger(0, 100),
  investors: getRandomInteger(0, 100),
  profitChangePercent: getRandomInteger(0, 100),
  sharpeRatio: getRandomInteger(0, 100),
  sortinoRatio: getRandomInteger(0, 100),
  calmarRatio: getRandomInteger(0, 100),
  maxDrawdown: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
};

export const fundStatisticDataLoaderData: IFundStatisticData = {
  statistic: fundStatisticLoaderData,
  statisticCurrency: "GVT"
};
