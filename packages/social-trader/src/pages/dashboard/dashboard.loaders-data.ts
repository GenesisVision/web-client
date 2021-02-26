import { ownerLoaderData } from "components/details/details.loader-data";
import { getEquityChartLoaderData } from "components/multi-chart/service/multi-chart.service";
import { ASSET } from "constants/constants";
import { AssetType, LimitWithoutKyc, MoneyLocation } from "gv-api-web";
import { brokerDetailsLoaderData } from "modules/follows-table/components/follow-table.loader-data";
import {
  TDashboardEvent,
  TDashboardInRequests,
  TDashboardRequest,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TRecommendation
} from "pages/dashboard/dashboard.types";
import {
  getRandomColor,
  getRandomInteger,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";

export const getInRequestsData = (): TDashboardRequest => ({
  id: "",
  date: new Date(),
  amount: getRandomInteger(-1000, 1000),
  currency: "GVT",
  type: "Invest",
  status: "Cancelled",
  canCancelRequest: false,
  assetDetails: {
    entryFee: 0,
    isWithdrawAll: false,
    successFee: 0,
    exitFee: 0,
    withdrawPercent: 0,
    managementFee: getRandomInteger(),
    id: "",
    logoUrl: "",
    color: "",
    title: "",
    url: "",
    assetType: "Follow",
    programDetails: {
      level: 0,
      levelProgress: 0
    }
  }
});
export const getInRequestsLoadersData = (): TDashboardInRequests =>
  tableLoaderCreator(getInRequestsData, 3);

export const getTradingEventsLoaderData = () => {
  const length = getRandomInteger(1, 4);
  return {
    items: tableLoaderCreator(getEventLoaderData, length),
    total: length
  };
};

export const assetsLoaderData = () => {
  let sum = 100;
  return tableLoaderCreator((item, i, { length }) => {
    const value = getRandomInteger(Math.round(sum / 4), Math.round(sum / 3));
    sum -= value;
    return {
      name: getRandomWords(3),
      percent: i === length - 1 ? sum + value : value,
      color: getRandomColor()
    };
  }, 5);
};

export const portfolioLoaderData = (): Array<MoneyLocation> => {
  let sum = 100;
  const names = ["Funds", "Programs", "Trading", "Wallet"];
  return tableLoaderCreator((item, i, { length }) => {
    const value = getRandomInteger(Math.round(sum / 4), Math.round(sum / 3));
    sum -= value;
    return {
      name: names[i],
      percent: i === length - 1 ? sum + value : value,
      color: getRandomColor()
    };
  }, 4);
};

export const getTradingStatisticLoaderData = (): TDashboardTradingStatistic => ({
  equity: getRandomInteger(-10000, 10000),
  aum: getRandomInteger(-10000, 10000),
  total: 100,
  profits: {
    day: {
      profit: 0,
      profitPercent: 0
    },
    week: {
      profit: 0,
      profitPercent: 0
    },
    month: {
      profit: 0,
      profitPercent: 0
    }
  },
  events: getTradingEventsLoaderData()
});

const getEventLoaderData = (): TDashboardEvent => ({
  logoUrl: "",
  assetDetails: {
    id: "",
    logoUrl: "",
    color: "",
    title: "",
    url: "",
    assetType: (getRandomAsset() as unknown) as AssetType,
    programDetails: {
      level: 0,
      levelProgress: 0
    }
  },
  currency: "GVT",
  changeState: "NotChanged",
  extendedInfo: [{ title: "", amount: 0, currency: "GVT" }],
  feesInfo: [
    {
      title: "",
      description: "",
      type: "Undefined",
      amount: 0,
      currency: "GVT"
    }
  ],
  totalFeesAmount: 0,
  totalFeesCurrency: "GVT",
  date: new Date("2020-01-11T06:15:02.703Z"),
  title: getRandomWords(3),
  amount: getRandomInteger(-10000, 10000)
});

const getRandomAsset = () =>
  [ASSET.FUND, ASSET.PROGRAM, ASSET.FOLLOW][getRandomInteger(0, 2)];

export const getRecommendationLoaderData = (): TRecommendation => {
  return {
    balance: { amount: 0, currency: "GVT" },
    brokerDetails: brokerDetailsLoaderData,
    tags: [],
    personalDetails: {
      isOwnAsset: false,
      isFavorite: false
    },
    owner: ownerLoaderData,
    successFee: 0,
    volumeFee: 0,
    status: "",
    tradesCount: 0,
    subscribersCount: 0,
    description: "",
    creationDate: new Date(),
    isExternal: false,
    leverageMax: getRandomInteger(-10000, 10000),
    leverageMin: getRandomInteger(-10000, 10000),
    currency: "GVT",
    statistic: {
      chart: getEquityChartLoaderData(),
      profit: getRandomInteger(-10000, 10000),
      drawdown: getRandomInteger(-10000, 10000)
    },
    id: "",
    logoUrl: "",
    title: getRandomWords(7),
    url: "",
    color: getRandomColor()
  };
};

export const getTotalLoaderData = (): TDashboardTotal => ({
  limitWithoutKyc: (undefined as unknown) as LimitWithoutKyc,
  total: getRandomInteger(1, 10000),
  trading: getRandomInteger(-10000, 10000),
  invested: getRandomInteger(-10000, 10000),
  wallets: getRandomInteger(-10000, 10000),
  profits: {
    day: {
      profit: 0,
      profitPercent: 0
    },
    week: {
      profit: 0,
      profitPercent: 0
    },
    month: {
      profit: 0,
      profitPercent: 0
    }
  }
});
