import { CancelablePromise, ChartSimple, ProgramProfitChart } from "gv-api-web";

import { ASSET } from "../../../constants/constants";
import { getRandomInteger } from "../../../utils/helpers";
import { ChartDefaultPeriod } from "../../chart/chart-period/chart-period.helpers";
import { ProfitChartDataType } from "../../details/details-statistic-section/details.chart.helpers";
import { periodsLoaderData } from "../../programs/program-details/periods.loader-data";
import { TChartAsset } from "../multi-chart.types";

export const fetchMultiChartData = ({
  assets,
  period
}: {
  assets: TChartAsset[];
  period: ChartDefaultPeriod;
}): CancelablePromise<ProfitChartDataType> => {
  return (saveSelectedAssets(assets).then(() =>
    Promise.resolve([
      getProfitChartLoaderDataWithEquity(),
      getProfitChartLoaderDataWithEquity(),
      getProfitChartLoaderDataWithEquity(),
      getProfitChartLoaderDataWithEquity(),
      getProfitChartLoaderDataWithEquity()
    ])
  ) as unknown) as CancelablePromise<ProfitChartDataType>;
};

export const fetchAssets = (
  period: ChartDefaultPeriod
): CancelablePromise<TChartAsset[]> => {
  return (Promise.resolve([
    { name: "Example1", logo: "", url: "", type: ASSET.FUND },
    { name: "Example2", logo: "", url: "", type: ASSET.PROGRAM },
    { name: "Example3", logo: "", url: "", type: ASSET.FUND },
    { name: "Example4", logo: "", url: "", type: ASSET.FUND },
    { name: "Example5", logo: "", url: "", type: ASSET.PROGRAM },
    { name: "Example6", logo: "", url: "", type: ASSET.FUND },
    { name: "Example8", logo: "", url: "", type: ASSET.PROGRAM },
    { name: "Example9", logo: "", url: "", type: ASSET.FUND },
    { name: "Example10", logo: "", url: "", type: ASSET.FUND },
    { name: "Example11", logo: "", url: "", type: ASSET.FUND },
    { name: "Example12", logo: "", url: "", type: ASSET.PROGRAM },
    { name: "Example13", logo: "", url: "", type: ASSET.FUND },
    { name: "Example14", logo: "", url: "", type: ASSET.FUND },
    { name: "Example15", logo: "", url: "", type: ASSET.PROGRAM },
    { name: "Example16", logo: "", url: "", type: ASSET.FUND },
    { name: "Example18", logo: "", url: "", type: ASSET.PROGRAM }
  ]) as unknown) as CancelablePromise<TChartAsset[]>;
};

export const fetchSelectedAssets = (): CancelablePromise<TChartAsset[]> => {
  return (Promise.resolve([
    { name: "Example3", logo: "", url: "", type: ASSET.FUND },
    { name: "Example10", logo: "", url: "", type: ASSET.FUND },
    { name: "Example11", logo: "", url: "", type: ASSET.FUND },
    { name: "Example14", logo: "", url: "", type: ASSET.FUND },
    { name: "Example18", logo: "", url: "", type: ASSET.PROGRAM }
  ]) as unknown) as CancelablePromise<TChartAsset[]>;
};

export const fetchAllAssets = ({
  period
}: {
  period: ChartDefaultPeriod;
}): CancelablePromise<TChartAsset[][]> =>
  (Promise.all([
    fetchAssets(period),
    fetchSelectedAssets()
  ]) as unknown) as CancelablePromise<TChartAsset[][]>;

export const isIncluded = (array: any[], val: string) =>
  !!array.find(({ name }) => name === val);

export const saveSelectedAssets = (assets: TChartAsset[]) => Promise.resolve();

export const getProfitChartLoaderDataWithEquity = (): ProgramProfitChart => ({
  equityChart: getEquityChartLoaderData(),
  totalProfit: 0,
  timeframeProfit: 0,
  programCurrency: "ETH",
  trades: 0,
  successTradesPercent: 0,
  profitFactor: 0,
  periods: periodsLoaderData,
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
});

export const getEquityChartLoaderData = (): ChartSimple[] => [
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-20T11:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-20T19:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-21T02:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-21T10:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-21T17:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-22T01:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-22T08:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-22T16:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-22T23:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-23T07:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-23T14:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-23T22:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-24T05:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-24T13:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-24T20:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-25T04:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-25T11:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-25T19:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-26T02:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-26T10:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-26T17:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-27T01:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-27T08:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-27T16:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-27T23:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-28T07:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-28T14:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-28T22:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-29T05:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-29T13:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-29T20:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-30T04:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-30T11:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-30T19:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-31T02:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-31T10:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-08-31T17:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-01T01:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-01T08:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-01T16:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-01T23:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-02T07:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-02T14:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-02T22:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-03T05:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-03T13:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-03T20:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-04T04:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-04T11:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-04T19:00:00.0000000+00:00")
  },
  {
    value: getRandomInteger(-10, 10),
    date: new Date("2019-09-05T02:00:00.0000000+00:00")
  }
  /*{
    value: -3.62,
    date: new Date("2019-09-05T10:00:00.0000000+00:00")
  },
  {
    value: -2.24,
    date: new Date("2019-09-05T17:00:00.0000000+00:00")
  },
  {
    value: -3.99,
    date: new Date("2019-09-06T01:00:00.0000000+00:00")
  },
  {
    value: -0.61,
    date: new Date("2019-09-06T08:00:00.0000000+00:00")
  },
  {
    value: -0.96,
    date: new Date("2019-09-06T16:00:00.0000000+00:00")
  },
  {
    value: -1.74,
    date: new Date("2019-09-06T23:00:00.0000000+00:00")
  },
  {
    value: -1.76,
    date: new Date("2019-09-07T07:00:00.0000000+00:00")
  },
  {
    value: -1.74,
    date: new Date("2019-09-07T14:00:00.0000000+00:00")
  },
  {
    value: -1.45,
    date: new Date("2019-09-07T22:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-08T05:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-08T13:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-08T20:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-09T04:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-09T11:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-09T19:00:00.0000000+00:00")
  },
  {
    value: 1.73,
    date: new Date("2019-09-10T02:00:00.0000000+00:00")
  },
  {
    value: -3.93,
    date: new Date("2019-09-10T10:00:00.0000000+00:00")
  },
  {
    value: -4.43,
    date: new Date("2019-09-10T17:00:00.0000000+00:00")
  },
  {
    value: -2.72,
    date: new Date("2019-09-11T01:00:00.0000000+00:00")
  },
  {
    value: -5.75,
    date: new Date("2019-09-11T08:00:00.0000000+00:00")
  },
  {
    value: -0.26,
    date: new Date("2019-09-11T16:00:00.0000000+00:00")
  },
  {
    value: 1.3,
    date: new Date("2019-09-11T23:00:00.0000000+00:00")
  },
  {
    value: 5.53,
    date: new Date("2019-09-12T07:00:00.0000000+00:00")
  },
  {
    value: 3.97,
    date: new Date("2019-09-12T14:00:00.0000000+00:00")
  },
  {
    value: 7.85,
    date: new Date("2019-09-12T22:00:00.0000000+00:00")
  },
  {
    value: 6.14,
    date: new Date("2019-09-13T05:00:00.0000000+00:00")
  },
  {
    value: 4.09,
    date: new Date("2019-09-13T13:00:00.0000000+00:00")
  },
  {
    value: 7.54,
    date: new Date("2019-09-13T20:00:00.0000000+00:00")
  },
  {
    value: 8.26,
    date: new Date("2019-09-14T04:00:00.0000000+00:00")
  },
  {
    value: 7.68,
    date: new Date("2019-09-14T11:00:00.0000000+00:00")
  },
  {
    value: 9.95,
    date: new Date("2019-09-14T19:00:00.0000000+00:00")
  },
  {
    value: 9.95,
    date: new Date("2019-09-15T02:00:00.0000000+00:00")
  },
  {
    value: 9.95,
    date: new Date("2019-09-15T10:00:00.0000000+00:00")
  },
  {
    value: 9.95,
    date: new Date("2019-09-15T17:00:00.0000000+00:00")
  },
  {
    value: 9.95,
    date: new Date("2019-09-16T01:00:00.0000000+00:00")
  },
  {
    value: 11.97,
    date: new Date("2019-09-16T08:00:00.0000000+00:00")
  },
  {
    value: 12.88,
    date: new Date("2019-09-16T16:00:00.0000000+00:00")
  },
  {
    value: 18.39,
    date: new Date("2019-09-16T23:00:00.0000000+00:00")
  },
  {
    value: 17.84,
    date: new Date("2019-09-17T07:00:00.0000000+00:00")
  },
  {
    value: 17.45,
    date: new Date("2019-09-17T14:00:00.0000000+00:00")
  },
  {
    value: 17.45,
    date: new Date("2019-09-17T22:00:00.0000000+00:00")
  },
  {
    value: 17.45,
    date: new Date("2019-09-18T05:00:00.0000000+00:00")
  },
  {
    value: 16.74,
    date: new Date("2019-09-18T13:00:00.0000000+00:00")
  },
  {
    value: 14.99,
    date: new Date("2019-09-18T20:00:00.0000000+00:00")
  },
  {
    value: 18.35,
    date: new Date("2019-09-19T04:00:00.0000000+00:00")
  },
  {
    value: 11.87,
    date: new Date("2019-09-19T11:00:00.0000000+00:00")
  },
  {
    value: 13.45,
    date: new Date("2019-09-19T19:00:00.0000000+00:00")
  },
  {
    value: 19.57,
    date: new Date("2019-09-20T02:00:00.0000000+00:00")
  },
  {
    value: 19.57,
    date: new Date("2019-09-20T10:00:00.0000000+00:00")
  }*/
];
