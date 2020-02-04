import "./dashboard-pie-chart.scss";

import useApiRequest from "hooks/api-request.hook";
import DashboardPieChart from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart";
import React, { useEffect } from "react";

import DashboardBlock from "../dashboard-block/dashboard-block";

const _DashboardPieChartBlock: React.FC<Props> = ({
  landscapeTablet,
  tablet,
  label,
  request,
  loaderData
}) => {
  const { data, sendRequest } = useApiRequest<any>({
    request
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <DashboardBlock
      landscapeTablet={landscapeTablet}
      tablet={tablet}
      label={label}
    >
      <DashboardPieChart loaderData={loaderData} data={data} />
    </DashboardBlock>
  );
};

interface Props {
  landscapeTablet?: boolean;
  tablet?: boolean;
  label: string;
  loaderData: any;
  request: (...args: any) => any;
}

const DashboardPieChartBlock = React.memo(_DashboardPieChartBlock);
export default DashboardPieChartBlock;
