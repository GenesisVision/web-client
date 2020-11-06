import useApiRequest, { DEFAULT_INTERVAL } from "hooks/api-request.hook";
import DashboardPieChart from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart";
import React, { useEffect } from "react";

import DashboardBlock, {
  DashboardBlockOrientation
} from "../dashboard-block/dashboard-block";

interface Props {
  name: string;
  orientation?: DashboardBlockOrientation;
  label: string;
  loaderData: any;
  request: (...args: any) => any;
}

const _DashboardPieChartBlock: React.FC<Props> = ({
  name,
  orientation,
  label,
  request,
  loaderData
}) => {
  const { data, sendRequest } = useApiRequest<any>({
    interval: DEFAULT_INTERVAL,
    name,
    cache: true,
    request
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <DashboardBlock orientation={orientation} label={label}>
      <DashboardPieChart loaderData={loaderData} data={data} />
    </DashboardBlock>
  );
};

const DashboardPieChartBlock = React.memo(_DashboardPieChartBlock);
export default DashboardPieChartBlock;
