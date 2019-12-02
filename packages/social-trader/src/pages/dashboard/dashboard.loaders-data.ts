import { getEquityChartLoaderData } from "components/multi-chart/service/multi-chart.service";
import { ASSETS_TYPES } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import * as faker from "faker";
import { AssetType, MoneyLocation } from "gv-api-web";
import {
  TDashboardEvent,
  TDashboardInRequests,
  TDashboardRequest,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TRecommendation
} from "pages/dashboard/dashboard.types";
import { ASSET, IDashboardAssetChart } from "shared/constants/constants";
import { getRandomInteger, tableLoaderCreator } from "utils/helpers";

export const getInRequestsData = (): TDashboardRequest => ({
  id: "",
  date: new Date(),
  amount: getRandomInteger(-1000, 1000),
  currency: "GVT",
  type: "Invest",
  status: "Cancelled",
  canCancelRequest: false,
  assetDetails: {
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
  fundRequestDetails: {
    entryFee: 0,
    exitFee: 0,
    withdrawPercent: 0
  },
  programRequestDetails: {
    entryFee: 0,
    isWithdrawAll: false,
    successFee: 0
  }
});
export const getInRequestsLoadersData = (): TDashboardInRequests =>
  tableLoaderCreator(getInRequestsData);

export const getTradingTotalLoaderData = (): TDashboardTradingStatistic =>
  ({
    // total: getRandomInteger(-1000, 1000),
    equity: getRandomInteger(-1000, 1000),
    assetsUnderManagement: getRandomInteger(-1000, 1000)
  } as TDashboardTradingStatistic);

export const getTradingEventsLoaderData = () => {
  const length = getRandomInteger(5, 15);
  return {
    items: tableLoaderCreator(getEventLoaderData, length),
    total: length
  };
};

export const getTradingPublicLoaderData = () => {
  const length = getRandomInteger(5, 15);
  return {
    items: tableLoaderCreator(getRecommendationLoaderData, length),
    total: length
  };
};

export const getTradingFollowLoaderData = () => {
  const length = getRandomInteger(5, 15);
  return {
    items: tableLoaderCreator(
      () => ({ ...getRecommendationLoaderData(), type: ASSET.FOLLOW }),
      getRandomInteger(5, 15)
    ),
    total: length
  };
};

export const getTradingLoaderData = () => ({
  total: getTradingTotalLoaderData(),
  public: getTradingPublicLoaderData(),
  personal: getTradingPublicLoaderData(),
  followThem: getTradingFollowLoaderData()
});

export const DashboardChartValueLoaderData: IDashboardAssetChart = {
  type: ASSETS_TYPES.Fund,
  id: "",
  title: "",
  currency: "GVT",
  equityChart: [],
  pnLChart: []
};

export const assetsLoaderData = () => {
  let sum = 100;
  return tableLoaderCreator((item, i, { length }) => {
    const value = getRandomInteger(Math.round(sum / 4), Math.round(sum / 3));
    sum -= value;
    return {
      name: faker.finance.currencyCode(),
      percent: i === length - 1 ? sum + value : value,
      color: faker.internet.color()
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
      color: faker.internet.color()
    };
  }, 4);
};

export const getTradingStatisticLoaderData = (): TDashboardTradingStatistic => ({
  equity: getRandomInteger(-10000, 10000),
  assetsUnderManagement: getRandomInteger(-10000, 10000),
  profits: {
    day: {
      profit: getRandomInteger(-10000, 10000),
      profitPercent: getRandomInteger(-100, 100)
    },
    week: {
      profit: getRandomInteger(-10000, 10000),
      profitPercent: getRandomInteger(-100, 100)
    },
    month: {
      profit: getRandomInteger(-10000, 10000),
      profitPercent: getRandomInteger(-100, 100)
    }
  },
  events: getTradingEventsLoaderData()
});

const getEventLoaderData = (): TDashboardEvent => ({
  icon: "",
  assetDetails: {
    id: "",
    logo: "",
    color: "",
    title: "",
    url: "",
    assetType: (getRandomAsset() as unknown) as AssetType,
    programDetails: { level: 0, levelProgress: 0 }
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
  date: new Date(),
  title: faker.lorem.words(3),
  amount: getRandomInteger(-10000, 10000)
});

const getRandomAsset = () =>
  [ASSET.FUND, ASSET.PROGRAM, ASSET.FOLLOW][getRandomInteger(0, 2)];

export const getRecommendationLoaderData = (): TRecommendation => {
  const assetType = getRandomAsset();
  return {
    broker: {
      logo: "",
      name: "",
      type: "MetaTrader4"
    },
    currency: "GVT",
    assetType,
    statistic: {
      chart: getEquityChartLoaderData(),
      profit: getRandomInteger(-10000, 10000),
      drawdown: getRandomInteger(-10000, 10000)
    },
    id: "",
    logo: "",
    title: faker.name.lastName(),
    url: "",
    programDetails: {
      level: assetType === ASSET.PROGRAM ? getRandomInteger(1, 7) : 0,
      levelProgress: assetType === ASSET.PROGRAM ? getRandomInteger(1, 100) : 0
    },
    color: faker.internet.color()
  };
};

export const getTotalLoaderData = (): TDashboardTotal => ({
  total: getRandomInteger(-10000, 10000),
  pending: getRandomInteger(-10000, 10000),
  invested: getRandomInteger(-10000, 10000),
  available: getRandomInteger(-10000, 10000),
  profits: {
    day: {
      profit: getRandomInteger(-10000, 10000),
      profitPercent: getRandomInteger(-100, 100)
    },
    week: {
      profit: getRandomInteger(-10000, 10000),
      profitPercent: getRandomInteger(-100, 100)
    },
    month: {
      profit: getRandomInteger(-10000, 10000),
      profitPercent: getRandomInteger(-100, 100)
    }
  }
});
