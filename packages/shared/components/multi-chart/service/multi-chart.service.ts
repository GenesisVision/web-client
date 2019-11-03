import { CancelablePromise } from "gv-api-web";

import { ASSET } from "../../../constants/constants";
import { ChartDefaultPeriod } from "../../chart/chart-period/chart-period.helpers";
import { ProfitChartDataType } from "../../details/details-statistic-section/details.chart.helpers";
import { TChartAsset } from "../multi-chart.types";

export const fetchMultiChartData = ({
  assets,
  period
}: {
  assets: TChartAsset[];
  period: ChartDefaultPeriod;
}): CancelablePromise<ProfitChartDataType> => {
  return (saveSelectedAssets(assets).then(() =>
    Promise.resolve([])
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
