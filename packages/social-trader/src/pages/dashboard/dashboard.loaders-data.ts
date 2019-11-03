import * as faker from "faker";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import { getEquityChartLoaderData } from "shared/components/multi-chart/service/multi-chart.service";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ASSET, IDashboardAssetChart } from "shared/constants/constants";
import { getRandomInteger, tableLoaderCreator } from "shared/utils/helpers";

export const DashboardChartValueLoaderData: IDashboardAssetChart = {
  type: ASSETS_TYPES.Fund,
  id: "",
  title: "",
  currency: "GVT",
  equityChart: [],
  pnLChart: []
};

export const assetsLoaderData = () =>
  tableLoaderCreator(
    () => ({
      name: faker.finance.currencyCode(),
      percent: getRandomInteger(0, 15)
    }),
    getRandomInteger(0, 15)
  );

export const portfolioLoaderData = () => [
  {
    name: "Funds",
    percent: getRandomInteger(0, 25)
  },
  {
    name: "Programs",
    percent: getRandomInteger(0, 25)
  },
  {
    name: "Trading",
    percent: getRandomInteger(0, 25)
  },
  {
    name: "Wallet",
    percent: getRandomInteger(0, 25)
  }
];

export const getProgramStatisticLoaderData = () => ({
  equity: getRandomInteger(-10000, 10000),
  AUM: getRandomInteger(-10000, 10000),
  total: {
    day: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    week: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    month: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    }
  },
  events: tableLoaderCreator(getEventLoaderData, getRandomInteger(1, 10))
});
export const getInvestingStatisticLoaderData = () => ({
  balance: getRandomInteger(-10000, 10000),
  programs: getRandomInteger(-10000, 10000),
  funds: getRandomInteger(-10000, 10000),
  total: {
    day: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    week: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    },
    month: {
      value: getRandomInteger(-10000, 10000),
      profit: getRandomInteger(-100, 100)
    }
  },
  events: tableLoaderCreator(getEventLoaderData, getRandomInteger(1, 10))
});

const getEventLoaderData = () => ({
  data: new Date(),
  description: faker.lorem.words(3),
  amount: getRandomInteger(-10000, 10000)
});

const getRandomAsset = () =>
  [ASSET.FUND, ASSET.PROGRAM, ASSET.FOLLOW][getRandomInteger(0, 2)];

export const getRecommendationLoaderData = (): TRecommendation => ({
  type: getRandomAsset(),
  color: faker.internet.color(),
  level: 0,
  levelProgress: 0,
  logo: "",
  id: "",
  url: "",
  title: faker.name.lastName(),
  manager: {
    username: faker.name.lastName(),
    url: faker.name.lastName()
  },
  currency: "GVT",
  profit: getRandomInteger(-1000, 1000),
  profitPercent: getRandomInteger(-1000, 1000),
  value: getRandomInteger(-1000, 1000),
  chart: getEquityChartLoaderData()
});

export const getTotalLoaderData = () => ({
  day: {
    value: getRandomInteger(-10000, 10000),
    profit: getRandomInteger(-100, 100)
  },
  week: {
    value: getRandomInteger(-10000, 10000),
    profit: getRandomInteger(-100, 100)
  },
  month: {
    value: getRandomInteger(-10000, 10000),
    profit: getRandomInteger(-100, 100)
  }
});
