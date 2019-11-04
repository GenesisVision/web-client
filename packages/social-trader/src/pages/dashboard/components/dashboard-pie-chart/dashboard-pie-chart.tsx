import React, { useState } from "react";
import MultiPieContainer from "shared/components/pie-container/multi-pie.container";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

const _DashboardPieChart: React.FC<Props> = ({ data }) => {
  const [overItem, setOverItem] = useState();
  return (
    <div className="dashboard-pie-chart__container">
      <div className="dashboard-pie-chart__pie-chart">
        <MultiPieContainer
          over={overItem}
          data={data.map(item => ({ ...item, value: item.percent }))}
        />
      </div>
      <div className="dashboard-pie-chart__names">
        {data.map(({ name, color, percent }) => (
          <div
            className="dashboard-pie-chart__name-container"
            onMouseEnter={() => setOverItem(name)}
            onMouseLeave={() => setOverItem(undefined)}
          >
            <div
              className="dashboard-pie-chart__bullet"
              style={{
                background: color
              }}
            />
            <div className="dashboard-pie-chart__name">
              {name} - {percent} %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
interface Props {
  data: any[];
}

const DashboardPieChart = withBlurLoader(React.memo(_DashboardPieChart));
export default DashboardPieChart;
