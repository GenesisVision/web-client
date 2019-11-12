import faker from "faker";
import { mockDate } from "shared/components/details/details.loader-data";

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
