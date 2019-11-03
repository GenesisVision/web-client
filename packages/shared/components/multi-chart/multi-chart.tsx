import "./multi-chart.scss";

import React, { useEffect, useState } from "react";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import useApiRequest from "shared/hooks/api-request.hook";
import { HandlePeriodChangeType } from "shared/utils/types";

import ChartAssetList from "./chart-asset-list";
import { TChartAsset } from "./multi-chart.types";
import { fetchMultiChartData } from "./service/multi-chart.service";

const _MultiChart: React.FC<Props> = ({
  assets,
  selectedAssets,
  period,
  handleChangePeriod
}) => {
  const [stateSelectedAssets, setSelectedAssets] = useState<TChartAsset[]>(
    selectedAssets
  );
  const { data: multiChartData, sendRequest } = useApiRequest<
    ProfitChartDataType
  >({
    request: fetchMultiChartData
  });

  useEffect(() => {
    sendRequest({ assets: stateSelectedAssets, period });
  }, [stateSelectedAssets, period]);
  return (
    <div className="multi-chart__block">
      {multiChartData && (
        <div className="multi-chart__profit-chart-block">
          <div className="multi-chart__period">
            <ChartPeriod period={period} onChange={handleChangePeriod} />
          </div>
          <div className="multi-chart__profit-chart">
            <ProgramProfitChart charts={multiChartData} colors={mockColors} />
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

interface Props {
  period: ChartDefaultPeriod;
  handleChangePeriod: HandlePeriodChangeType;
  assets: TChartAsset[];
  selectedAssets: TChartAsset[];
}

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
