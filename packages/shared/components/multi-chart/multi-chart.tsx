import "./multi-chart.scss";

import { CancelablePromise } from "gv-api-web";
import React, { useEffect, useState } from "react";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import useApiRequest from "shared/hooks/api-request.hook";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import { withBlurLoader } from "../../decorators/with-blur-loader";
import ChartAssetList from "./chart-asset-list";
import { TChartAsset } from "./multi-chart.types";
import MultiProfitChart from "./multi-profit-chart";
import { saveSelectedAssets } from "./service/multi-chart.service";

const _MultiChart: React.FC<Props> = ({
  currency,
  request,
  data: assets,
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
  }, [stateSelectedAssets, period, currency]);
  return (
    <div className="multi-chart__block">
      {multiChartData && (
        <div className="multi-chart__profit-chart-block">
          <div className="multi-chart__period">
            <ChartPeriod period={period} onChange={handleChangePeriod} />
          </div>
          <div className="multi-chart__profit-chart">
            <MultiProfitChart charts={multiChartData} />
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
  data: TChartAsset[];
  selectedAssets: string[];
}

const MultiChart = withBlurLoader(React.memo(_MultiChart));
export default MultiChart;
