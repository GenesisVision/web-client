import { DashboardChartAsset } from "gv-api-web";
import {
  fetchAssets,
  fetchMultiChartData
} from "pages/dashboard/services/dashboard.service";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import MultiChart from "shared/components/multi-chart/multi-chart";
import { getSelectedAssets } from "shared/components/multi-chart/service/multi-chart.service";
import useApiRequest from "shared/hooks/api-request.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { HandlePeriodChangeType } from "shared/utils/types";

const _DashboardMultiChartContainer: React.FC<Props> = ({
  period,
  handleChangePeriod
}) => {
  const currency = useSelector(currencySelector);
  const { data, sendRequest } = useApiRequest<DashboardChartAsset[]>({
    request: fetchAssets
  });
  useEffect(() => {
    sendRequest({ period, currency });
  }, []);
  const selectedAssets = getSelectedAssets();
  return (
    <MultiChart
      currency={currency}
      request={fetchMultiChartData}
      assets={[]}
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

const DashboardMultiChartContainer = React.memo(_DashboardMultiChartContainer);
export default DashboardMultiChartContainer;
