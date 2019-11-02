import { CancelablePromise } from "gv-api-web";

import { ASSET } from "../../../constants/constants";
import { ChartDefaultPeriod } from "../../chart/chart-period/chart-period.helpers";
import { ProfitChartDataType } from "../../details/details-statistic-section/details.chart.helpers";
import { getProfitChartLoaderDataWithEquity } from "../../programs/program-details/program-details.loader-data";
import { TChartAsset } from "../multi-chart.types";

export const fetchMultiChart = ({
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
      getProfitChartLoaderDataWithEquity()
    ])
  ) as unknown) as CancelablePromise<ProfitChartDataType>;
};

export const fetchAssets = (): CancelablePromise<TChartAsset> => {
  return (Promise.resolve([
    { name: "Example1", logo: "", type: ASSET.FUND },
    { name: "Example2", logo: "", type: ASSET.PROGRAM },
    { name: "Example3", logo: "", type: ASSET.FUND },
    { name: "Example4", logo: "", type: ASSET.FUND },
    { name: "Example5", logo: "", type: ASSET.PROGRAM },
    { name: "Example6", logo: "", type: ASSET.FUND },
    { name: "Example8", logo: "", type: ASSET.PROGRAM },
    { name: "Example9", logo: "", type: ASSET.FUND },
    { name: "Example10", logo: "", type: ASSET.FUND },
    { name: "Example11", logo: "", type: ASSET.FUND },
    { name: "Example12", logo: "", type: ASSET.PROGRAM },
    { name: "Example13", logo: "", type: ASSET.FUND },
    { name: "Example14", logo: "", type: ASSET.FUND },
    { name: "Example15", logo: "", type: ASSET.PROGRAM },
    { name: "Example16", logo: "", type: ASSET.FUND },
    { name: "Example18", logo: "", type: ASSET.PROGRAM }
  ]) as unknown) as CancelablePromise<TChartAsset>;
};

export const isIncluded = (array: any[], val: string) =>
  !!array.find(({ name }) => name === val);

export const saveSelectedAssets = (assets: TChartAsset[]) => Promise.resolve();
