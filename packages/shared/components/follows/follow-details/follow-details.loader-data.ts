import faker from "faker";
import {
  BrokerDetails,
  LevelsParamsInfo,
  OrderModel,
  PersonalProgramDetailsFull,
  ProgramDetailsListStatistic,
  ProgramProfitChart,
  ProgramStatistic,
  TradesViewModel
} from "gv-api-web";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import {
  amountWithCurrencyLoaderData,
  managerLoaderData,
  mockDate
} from "shared/components/details/details.loader-data";
import { getRandomInteger, tableLoaderCreator } from "shared/utils/helpers";
import { CurrencyEnum } from "shared/utils/types";

import { FollowDetailsDataType } from "./follow-details.types";

export const profitChartLoaderData: ProgramProfitChart = {
  equityChart: [],
  totalProfit: 0,
  timeframeProfit: 0,
  programCurrency: "ETH",
  trades: 0,
  successTradesPercent: 0,
  profitFactor: 0,
  periods: [],
  lastPeriodStarts: ("2019-09-24T06:02:14.7974010+00:00" as unknown) as Date,
  lastPeriodEnds: ("2019-09-24T07:02:14.7974010+00:00" as unknown) as Date,
  tradingVolume: 0,
  balance: 25.80216005,
  investors: 3,
  profitChangePercent: -22.4,
  sharpeRatio: 1.3872456301077910581826258857,
  sortinoRatio: 1.9150963753755977061955791825,
  calmarRatio: 1.0426212040490143846563665424,
  maxDrawdown: -18.71759074591144794575189469,
  rate: 158.63
};

export const profitChartDataLoaderData: ProfitChartDataType = [
  profitChartLoaderData
];

export const statisticDataLoaderData = {
  statisticCurrency: "",
  statistic: {
    equityChart: [],
    totalProgramCurrencyProfit: faker.random.number(),
    timeframeProgramCurrencyProfit: faker.random.number(),
    programCurrency: "GVT",
    trades: faker.random.number(),
    successTradesPercent: faker.random.number(),
    profitFactor: faker.random.number(),
    periods: [],
    lastPeriodStarts: mockDate,
    lastPeriodEnds: mockDate,
    tradingVolume: faker.random.number(),
    totalGvtProfit: faker.random.number(),
    timeframeGvtProfit: faker.random.number(),
    balance: faker.random.number(),
    investors: faker.random.number(),
    profitChangePercent: faker.random.number(),
    sharpeRatio: faker.random.number(),
    sortinoRatio: faker.random.number(),
    calmarRatio: faker.random.number(),
    maxDrawdown: faker.random.number(),
    rate: faker.random.number()
  }
};

export const brokerDetailsLoaderData: BrokerDetails = {
  logo: "",
  name: faker.name.firstName(),
  isForex: false,
  showSwaps: false,
  showTickets: false,
  showCommissionRebate: false,
  isForexSometime: false,
  showSwapsSometime: false,
  showTicketsSometime: false,
  showCommissionRebateSometime: false
};

export const statisticLoaderData: ProgramStatistic = {
  balanceBase: amountWithCurrencyLoaderData,
  balanceGVT: amountWithCurrencyLoaderData,
  balanceSecondary: amountWithCurrencyLoaderData,
  currentValue: getRandomInteger(0, 100),
  profitPercent: getRandomInteger(0, 100),
  profitValue: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 10),
  hasNotifications: false,
  startDate: mockDate,
  startBalance: getRandomInteger(0, 100),
  startCurrency: "GVT",
  investedAmount: getRandomInteger(0, 100),
  investedCurrency: "GVT",
  tradesCount: getRandomInteger(0, 100),
  tradesSuccessCount: getRandomInteger(0, 100),
  profitFactorPercent: getRandomInteger(0, 100),
  sharpeRatioPercent: getRandomInteger(0, 100)
};

export const statisticListLoaderData: ProgramDetailsListStatistic = {
  balance: {
    amount: getRandomInteger(0, 100),
    currency: "GVT"
  },
  currentValue: getRandomInteger(0, 100),
  profitPercent: getRandomInteger(0, 100),
  profitValue: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 100),
  tradesCount: getRandomInteger(0, 100)
};

export const levelsParamsLoaderData: LevelsParamsInfo = {
  minAvailableToInvest: getRandomInteger(0, 100),
  maxAvailableToInvest: getRandomInteger(0, 100),
  unverifiedAvailableToInvest: getRandomInteger(0, 100),
  genesisRatioMin: getRandomInteger(0, 100),
  genesisRatioMax: getRandomInteger(0, 100),
  genesisRatioHighRisk: getRandomInteger(0, 100),
  volumeScaleMin: getRandomInteger(0, 100),
  volumeScaleMax: getRandomInteger(0, 100),
  programAgeMax: getRandomInteger(0, 100),
  ageByVolumeMax: getRandomInteger(0, 100),
  investmentScaleMin: getRandomInteger(0, 100),
  investmentScaleMax: getRandomInteger(0, 100),
  investmentScaleHighRisk: getRandomInteger(0, 100)
};

export const tradeLoaderDataCreator = (): OrderModel => ({
  id: "",
  login: "",
  ticket: "",
  symbol: "",
  volume: getRandomInteger(0, 100),
  profit: getRandomInteger(0, 100),
  direction: {},
  date: new Date(),
  price: getRandomInteger(0, 100),
  priceCurrent: getRandomInteger(0, 100),
  entry: {},
  baseVolume: getRandomInteger(0, 100),
  originalCommission: getRandomInteger(0, 100),
  originalCommissionCurrency: "",
  commission: getRandomInteger(0, 100),
  swap: getRandomInteger(0, 100),
  showOriginalCommission: false,
  signalData: {
    masters: []
  }
});

export const tradesLoaderData: TradesViewModel = {
  showSwaps: false,
  showTickets: false,
  trades: tableLoaderCreator(tradeLoaderDataCreator),
  tradesDelay: {},
  total: 10
};
