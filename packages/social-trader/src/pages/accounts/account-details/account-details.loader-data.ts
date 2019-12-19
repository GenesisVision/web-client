import { mockDate } from "components/details/details.loader-data";
import faker from "faker";
import { AccountSubscriptionsDataType } from "pages/accounts/account-details/services/account-details.types";
import {
  getRandomInteger,
  getRandomWord,
  tableLoaderCreator
} from "utils/helpers";

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

const getAccountSubscriptionLoaderData = (): AccountSubscriptionsDataType => ({
  isExternal: false,
  subscriptionDate: new Date(),
  subscriberInfo: {
    tradingAccountId: getRandomWord(),
    tradingAccountLogin: getRandomWord()
  },
  asset: {
    id: "",
    logo: "",
    color: "",
    title: "",
    url: "",
    assetType: "Follow",
    programDetails: {
      level: 0,
      levelProgress: 0
    }
  },
  status: "",
  hasSignalAccount: false,
  hasActiveSubscription: false,
  mode: "Percent",
  percent: getRandomInteger(0, 100),
  openTolerancePercent: getRandomInteger(0, 100),
  fixedVolume: getRandomInteger(0, 100),
  fixedCurrency: "USD",
  totalProfit: getRandomInteger(0, 100),
  totalVolume: getRandomInteger(0, 100)
});

export const getAccountSubscriptionsLoaderData = (): AccountSubscriptionsDataType[] =>
  tableLoaderCreator(getAccountSubscriptionLoaderData, 3);
