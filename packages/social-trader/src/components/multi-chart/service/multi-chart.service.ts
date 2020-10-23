import { SimpleChartPoint } from "gv-api-web";
import { getCookie, setCookie } from "utils/cookie";
import { getRandomInteger } from "utils/helpers";

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

export const getEquityChartLoaderData = (): SimpleChartPoint[] => [];
