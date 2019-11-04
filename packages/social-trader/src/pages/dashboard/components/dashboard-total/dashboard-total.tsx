import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import React from "react";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import { TDashboardTotal } from "../../dashboard.types";

const _DashboardTotal: React.FC<Props> = ({ data }) => {
  return (
    <div className="dashboard-total__values">
      <DashboardStatisticPeriods data={data} withProfitability />
    </div>
  );
};

interface Props {
  data: TDashboardTotal;
}

const DashboardTotal = withBlurLoader(React.memo(_DashboardTotal));
export default DashboardTotal;
