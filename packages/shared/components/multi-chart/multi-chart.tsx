import "./multi-chart.scss";

import { CancelablePromise } from "gv-api-web";
import React, { useEffect, useState } from "react";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import useApiRequest from "shared/hooks/api-request.hook";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import ChartAssetList from "./chart-asset-list";
import { TChartAsset } from "./multi-chart.types";
import { saveSelectedAssets } from "./service/multi-chart.service";

const _MultiChart: React.FC<Props> = ({
  currency,
  request,
  assets,
  selectedAssets,
  period,
  handleChangePeriod
}) => {
  const [stateSelectedAssets, setSelectedAssets] = useState<string[]>(
    selectedAssets
  );
  const { data: multiChartData, sendRequest } = useApiRequest({
    request
  });

  useEffect(() => {
    saveSelectedAssets(stateSelectedAssets);
    sendRequest({ assets: stateSelectedAssets, period, currency });
  }, [stateSelectedAssets, period]);
  return (
    <div className="multi-chart__block">
      {multiChartData && (
        <div className="multi-chart__profit-chart-block">
          <div className="multi-chart__period">
            <ChartPeriod period={period} onChange={handleChangePeriod} />
          </div>
          <div className="multi-chart__profit-chart">
            <ProgramProfitChart charts={multiChartData} />
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
  currency: CurrencyEnum;
  request: (args: {
    currency: CurrencyEnum;
    assets: string[];
    period: ChartDefaultPeriod;
  }) => CancelablePromise<any>;
  period: ChartDefaultPeriod;
  handleChangePeriod: HandlePeriodChangeType;
  assets: TChartAsset[];
  selectedAssets: string[];
}

const MultiChart = React.memo(_MultiChart);
export default MultiChart;
