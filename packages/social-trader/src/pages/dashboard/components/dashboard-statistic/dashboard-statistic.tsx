import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardStatisticTable from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-table";
import React from "react";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import {
  TDashboardInvestingStatistic,
  TDashboardProgramsStatistic
} from "../../dashboard.types";

const _DashboardStatistic: React.FC<Props> = ({ renderValues, data }) => {
  const { total, events } = data;
  return (
    <div>
      <div className="dashboard-statistic__values">
        <StatisticItemList>{renderValues(data)}</StatisticItemList>
        <DashboardStatisticPeriods data={total} />
      </div>
      <DashboardStatisticTable data={events} />
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: TDashboardProgramsStatistic & TDashboardInvestingStatistic;
  renderValues: (
    statistic: TDashboardProgramsStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
}

const DashboardStatistic = withBlurLoader(React.memo(_DashboardStatistic));
export default DashboardStatistic;
