import {
  FundDetailsFull,
  FundProfitChart,
  FundStatistic,
  PersonalFundDetailsFull
} from "gv-api-web";
import {
  amountWithCurrencyLoaderData,
  managerLoaderData,
  mockDate
} from "shared/components/details/details.loader-data";
import { getRandomInteger } from "shared/utils/helpers";
import faker from "faker";
import { equityChartLoaderData } from "./equity-chart.loader-data";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { IFundStatisticData } from "./fund-details-statistics-section/fund-details-statistics/fund-details-statistics-elements";

export const fundChartLoaderData: FundProfitChart = {
  totalUsdProfit: 0.0,
  timeframeUsdProfit: 0.0,
  rebalances: 0,
  totalGvtProfit: 0.0,
  timeframeGvtProfit: 0.0,
  creationDate: new Date("2019-08-08T14:59:16.3828400+00:00"),
  profitPercent: 17.94,
  equityChart: equityChartLoaderData,
  balance: 115.621828125,
  investors: 0,
  profitChangePercent: 18.84,
  sharpeRatio: 3.1150228132957595669491859326,
  sortinoRatio: 3.6275830131317053579413109728,
  calmarRatio: 1.3037790697674418604651162791,
  maxDrawdown: -10.44798785117691723614274867,
  rate: 1.0
};

export const fundChartDataLoaderData: ProfitChartDataType = [
  fundChartLoaderData
];

export const fundStatisticLoaderData: FundProfitChart = {
  totalUsdProfit: getRandomInteger(0, 100),
  timeframeUsdProfit: getRandomInteger(0, 100),
  rebalances: getRandomInteger(0, 100),
  totalGvtProfit: getRandomInteger(0, 100),
  timeframeGvtProfit: getRandomInteger(0, 100),
  creationDate: mockDate,
  profitPercent: getRandomInteger(0, 100),
  equityChart: equityChartLoaderData,
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

export const personalFundDetailsFull: PersonalFundDetailsFull = {
  withdrawPercent: getRandomInteger(0, 100),
  canReallocate: false,
  availableReallocationPercents: getRandomInteger(0, 100),
  nextReallocationPercents: mockDate,
  exitFeePersonal: getRandomInteger(0, 100),
  isFavorite: false,
  isInvested: false,
  isOwnProgram: false,
  canCloseProgram: false,
  canCloseAsset: false,
  isFinishing: false,
  canInvest: false,
  canWithdraw: false,
  canClosePeriod: false,
  hasNotifications: false,
  value: getRandomInteger(0, 100),
  profit: getRandomInteger(0, 100),
  invested: getRandomInteger(0, 100),
  pendingInput: getRandomInteger(0, 100),
  pendingOutput: getRandomInteger(0, 100),
  pendingOutputIsWithdrawAll: false,
  status: "Pending"
};

const statisticLoaderData: FundStatistic = {
  balanceGVT: amountWithCurrencyLoaderData,
  balanceSecondary: amountWithCurrencyLoaderData,
  balance: amountWithCurrencyLoaderData,
  profitPercent: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 100),
  startDate: mockDate,
  startBalance: getRandomInteger(0, 100),
  investedAmount: getRandomInteger(0, 100),
  rebalancingCount: getRandomInteger(0, 100)
};

export const fundDetailsLoaderData: FundDetailsFull = {
  entryFee: getRandomInteger(0, 100),
  exitFee: getRandomInteger(0, 100),
  managementFee: getRandomInteger(0, 100),
  currentAssets: [],
  statistic: statisticLoaderData,
  personalFundDetails: personalFundDetailsFull,
  id: "",
  logo: "",
  url: "",
  color: faker.internet.color(),
  description: faker.lorem.sentences(3),
  title: faker.lorem.word(),
  ipfsHash: "",
  creationDate: mockDate,
  status: "None",
  manager: managerLoaderData
};
