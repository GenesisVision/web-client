import React from "react";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

const _DashboardPieChart: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map(({ name }) => (
        <div className="">{name}</div>
      ))}
    </div>
  );
};
interface Props {
  data: any[];
}

const DashboardPieChart = withBlurLoader(React.memo(_DashboardPieChart));
export default DashboardPieChart;
