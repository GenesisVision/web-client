import "./multi-chart.scss";

import React, { useEffect } from "react";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ASSET } from "shared/constants/constants";
import useApiRequest from "shared/hooks/api-request.hook";
import { HandlePeriodChangeType } from "shared/utils/types";

import MultiChart from "./multi-chart";
import { TChartAsset } from "./multi-chart.types";
import { fetchAllAssets } from "./service/multi-chart.service";

const _MultiChartContainer: React.FC<Props> = ({
  period,
  handleChangePeriod
}) => {
  const { data, sendRequest } = useApiRequest<TChartAsset[][]>({
    request: fetchAllAssets
  });
  useEffect(() => {
    sendRequest();
  }, []);
  if (!data) return null;
  const [assets, selectedAssets] = data;
  return (
    <MultiChart
      assets={assets}
      selectedAssets={selectedAssets}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  );
};

interface Props {
  period: ChartDefaultPeriod;
  handleChangePeriod: HandlePeriodChangeType;
}

const MockSelectedAssets = [
  { name: "Example4", logo: "", type: ASSET.FUND, url: "" },
  { name: "Example5", logo: "", type: ASSET.PROGRAM, url: "" },
  { name: "Example6", logo: "", type: ASSET.FUND, url: "" }
];

const MultiChartContainer = React.memo(_MultiChartContainer);
export default MultiChartContainer;
