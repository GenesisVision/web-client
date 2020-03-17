import classNames from "classnames";
import MultiPieContainer from "components/pie-container/multi-pie.container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import React, { useState } from "react";

const _DashboardPieChart: React.FC<Props> = ({ data }) => {
  const [overItem, setOverItem] = useState<string>();
  return (
    <div className="dashboard-pie-chart__container">
      <div className="dashboard-pie-chart__pie-chart">
        <MultiPieContainer
          setOverItem={setOverItem}
          over={overItem}
          data={data.map(item => ({ ...item, value: item.percent }))}
        />
      </div>
      <div>
        {data.map(({ name, color, percent }) => (
          <Row
            className={classNames("dashboard-pie-chart__name-container", {
              "dashboard-pie-chart__name-container--selected": name === overItem
            })}
            onMouseEnter={() => setOverItem(name)}
            onMouseLeave={() => setOverItem(undefined)}
          >
            <RowItem>
              <div
                className="dashboard-pie-chart__bullet"
                style={{
                  background: color
                }}
              />
            </RowItem>
            <div className="dashboard-pie-chart__name">
              {name} - {percent} %
            </div>
          </Row>
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
