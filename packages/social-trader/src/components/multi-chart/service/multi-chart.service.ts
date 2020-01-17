import { SimpleChart, SimpleChartPoint } from "gv-api-web";
import { getCookie, setCookie } from "utils/cookie";
import { getRandomInteger } from "utils/helpers";

import { ChartDefaultPeriod } from "../../chart/chart-period/chart-period.helpers";
import { TChartAsset } from "../multi-chart.types";

export const SELECTED_ASSETS = "SELECTED_ASSETS";

export const isIncluded = (array: any[], val: string) =>
  !!array.find(title => title === val);

export const saveSelectedAssets = (assets: string[]) =>
  setCookie(
    SELECTED_ASSETS,
    JSON.stringify({
      [SELECTED_ASSETS]: assets
    })
  );

export const getSelectedAssets = (): string[] =>
  getCookie(SELECTED_ASSETS)
    ? JSON.parse(getCookie(SELECTED_ASSETS)!)[SELECTED_ASSETS]
    : [];

export const getEquityChartLoaderData = (): SimpleChartPoint[] => [
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-20T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-20T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-21T02:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-21T10:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-21T17:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-22T01:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-22T08:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-22T16:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-22T23:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-23T07:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-23T14:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-23T22:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-24T05:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-24T13:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-24T20:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-25T04:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-25T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-25T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-26T02:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-26T10:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-26T17:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-27T01:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-27T08:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-27T16:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-27T23:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-28T07:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-28T14:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-28T22:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-29T05:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-29T13:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-29T20:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-30T04:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-30T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-30T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-31T02:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-31T10:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-08-31T17:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-01T01:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-01T08:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-01T16:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-01T23:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-02T07:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-02T14:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-02T22:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-03T05:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-03T13:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-03T20:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-04T04:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-04T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-04T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: getRandomInteger(-1000, 1000),
    date: new Date("2019-09-05T02:00:00.0000000+00:00").getSeconds()
  }
  /*{
    value: -3.62,
    date: new Date("2019-09-05T10:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -2.24,
    date: new Date("2019-09-05T17:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -3.99,
    date: new Date("2019-09-06T01:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -0.61,
    date: new Date("2019-09-06T08:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -0.96,
    date: new Date("2019-09-06T16:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -1.74,
    date: new Date("2019-09-06T23:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -1.76,
    date: new Date("2019-09-07T07:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -1.74,
    date: new Date("2019-09-07T14:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -1.45,
    date: new Date("2019-09-07T22:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-08T05:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-08T13:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-08T20:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-09T04:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-09T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-09T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.73,
    date: new Date("2019-09-10T02:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -3.93,
    date: new Date("2019-09-10T10:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -4.43,
    date: new Date("2019-09-10T17:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -2.72,
    date: new Date("2019-09-11T01:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -5.75,
    date: new Date("2019-09-11T08:00:00.0000000+00:00").getSeconds()
  },
  {
    value: -0.26,
    date: new Date("2019-09-11T16:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 1.3,
    date: new Date("2019-09-11T23:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 5.53,
    date: new Date("2019-09-12T07:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 3.97,
    date: new Date("2019-09-12T14:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 7.85,
    date: new Date("2019-09-12T22:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 6.14,
    date: new Date("2019-09-13T05:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 4.09,
    date: new Date("2019-09-13T13:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 7.54,
    date: new Date("2019-09-13T20:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 8.26,
    date: new Date("2019-09-14T04:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 7.68,
    date: new Date("2019-09-14T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 9.95,
    date: new Date("2019-09-14T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 9.95,
    date: new Date("2019-09-15T02:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 9.95,
    date: new Date("2019-09-15T10:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 9.95,
    date: new Date("2019-09-15T17:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 9.95,
    date: new Date("2019-09-16T01:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 11.97,
    date: new Date("2019-09-16T08:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 12.88,
    date: new Date("2019-09-16T16:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 18.39,
    date: new Date("2019-09-16T23:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 17.84,
    date: new Date("2019-09-17T07:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 17.45,
    date: new Date("2019-09-17T14:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 17.45,
    date: new Date("2019-09-17T22:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 17.45,
    date: new Date("2019-09-18T05:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 16.74,
    date: new Date("2019-09-18T13:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 14.99,
    date: new Date("2019-09-18T20:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 18.35,
    date: new Date("2019-09-19T04:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 11.87,
    date: new Date("2019-09-19T11:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 13.45,
    date: new Date("2019-09-19T19:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 19.57,
    date: new Date("2019-09-20T02:00:00.0000000+00:00").getSeconds()
  },
  {
    value: 19.57,
    date: new Date("2019-09-20T10:00:00.0000000+00:00").getSeconds()
  }*/
];
