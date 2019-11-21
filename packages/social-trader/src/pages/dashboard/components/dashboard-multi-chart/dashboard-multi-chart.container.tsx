import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import MultiChart from "components/multi-chart/multi-chart";
import { getSelectedAssets } from "components/multi-chart/service/multi-chart.service";
import { DashboardChartAsset } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import {
  fetchAssets,
  fetchMultiChartData
} from "pages/dashboard/services/dashboard.service";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { HandlePeriodChangeType } from "utils/types";

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
      loaderData={[]}
      currency={currency}
      request={fetchMultiChartData}
      data={data!}
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
