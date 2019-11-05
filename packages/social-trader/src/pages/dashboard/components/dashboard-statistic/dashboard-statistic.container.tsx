import "./dashboard-statistic.scss";

import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useEffect } from "react";
import useApiRequest from "shared/hooks/api-request.hook";

import { getProgramStatisticLoaderData } from "../../dashboard.loaders-data";
import {
  TDashboardInvestingStatistic,
  TDashboardProgramsStatistic
} from "../../dashboard.types";
import DashboardStatistic from "./dashboard-statistic";

const _DashboardStatisticContainer: React.FC<Props> = ({
  label,
  request,
  renderValues
}) => {
  const { data, sendRequest } = useApiRequest<
    TDashboardProgramsStatistic & TDashboardInvestingStatistic
  >({
    request
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <DashboardBlock
      label={label}
      all={""}
      className="dashboard-statistic__container"
    >
      <DashboardStatistic
        renderValues={renderValues}
        loaderData={getProgramStatisticLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

interface Props {
  renderValues: (
    statistic: TDashboardProgramsStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
  label: string;
  request: (...args: any) => any;
}

const DashboardStatisticContainer = React.memo(_DashboardStatisticContainer);
export default DashboardStatisticContainer;
