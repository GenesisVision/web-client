import "./multi-chart.scss";

import React, { useEffect, useState } from "react";

import { ASSET } from "../../constants/constants";
import useApiRequest from "../../hooks/api-request.hook";
import { HandlePeriodChangeType } from "../../utils/types";
import ChartPeriod from "../chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "../chart/chart-period/chart-period.helpers";
import { ProfitChartDataType } from "../details/details-statistic-section/details.chart.helpers";
import ProgramProfitChart from "../programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import ChartAssetList from "./chart-asset-list";
import { TChartAsset } from "./multi-chart.types";
import { fetchAssets, fetchMultiChart } from "./service/multi-chart.service";

const _MultiChart: React.FC<Props> = ({
  assets,
  selectedAssets,
  period,
  handleChangePeriod
}) => {
  const [stateSelectedAssets, setSelectedAssets] = useState<TChartAsset[]>(
    selectedAssets
  );
  const { data: multiChart, sendRequest } = useApiRequest<ProfitChartDataType>({
    request: fetchMultiChart
  });

  useEffect(() => {
    sendRequest({ assets: stateSelectedAssets, period });
  }, [stateSelectedAssets, period]);
  return (
    <div className="multi-chart__block">
      {multiChart && (
        <div className="multi-chart__profit-chart-block">
          <div className="multi-chart__period">
            <ChartPeriod period={period} onChange={handleChangePeriod} />
          </div>
          <div className="multi-chart__profit-chart">
            <ProgramProfitChart charts={multiChart} colors={mockColors} />
          </div>
        </div>
      )}
      <ChartAssetList
        assets={assets}
        selectedAssets={stateSelectedAssets}
        onChange={setSelectedAssets}
      />
    </div>
  );
};

export const MultiChartContainer: React.FC<{
  period: ChartDefaultPeriod;
  handleChangePeriod: HandlePeriodChangeType;
}> = ({ period, handleChangePeriod }) => {
  const { data: assets, sendRequest } = useApiRequest<TChartAsset[]>({
    request: fetchAssets
  });
  useEffect(() => {
    sendRequest();
  }, []);
  if (!assets) return null;
  return (
    <MultiChart
      assets={assets}
      selectedAssets={MockSelectedAssets}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  );
};

interface Props {
  period: ChartDefaultPeriod;
  handleChangePeriod: HandlePeriodChangeType;
  assets: TChartAsset[];
  selectedAssets: TChartAsset[];
}

const MockSelectedAssets = [
  { name: "Example4", logo: "", type: ASSET.FUND },
  { name: "Example5", logo: "", type: ASSET.PROGRAM },
  { name: "Example6", logo: "", type: ASSET.FUND }
];

const mockColors = [
  { name: "", color: "#F7931A" },
  { name: "", color: "#627EEA" },
  { name: "", color: "#26A17B" },
  { name: "", color: "#612171" },
  { name: "", color: "#715628" },
  { name: "", color: "#712026" },
  { name: "", color: "#16B9AD" }
];

const MultiChart = React.memo(_MultiChart);
export default MultiChart;
