import ChartTooltip from "components/chart/chart-tooltip";
import Chip from "components/chip/chip";
import React from "react";

import { BAR_COLORS } from "../dashboard-chart.constants";

const assetChipType = value => {
  if (value > 0) return { type: "positive" };
  if (value < 0) return { type: "negative" };
  return {};
};
const AssetsTooltipBody = ({ assets }) => {
  return assets.map((x, i) => (
    <div className="asset" key={x.id}>
      <div className="asset__indicator" style={{ background: BAR_COLORS[i] }} />
      <div className="asset__stats">
        <div className="asset__asset-title">{x.title}</div>
        <div className="asset__asset-value">{`${x.value} GVT`}</div>
      </div>
      <div className="asset__change">
        <div className="asset__change-percent">
          <Chip {...assetChipType(x.changePercent)} rounded>
            {`${x.changePercent}%`}
          </Chip>
        </div>
        <div className="asset__change-value">{`${x.changeValue} GVT`}</div>
      </div>
    </div>
  ));
};
const DasboardPortfolioTooltip = ({
  active,
  label,
  payload,
  heading,
  body,
  date
}) => {
  if (!active) return null;
  const data = payload[0].payload;
  if (data.profitValue === undefined) {
    return (
      <ChartTooltip
        heading="Assets"
        body={<AssetsTooltipBody assets={data.assets} />}
        date={label}
        className="assets-tooltip"
      />
    );
  }
  return (
    <ChartTooltip
      heading="Total balance"
      body={`${data.profitValue} GVT`}
      date={label}
    />
  );
};
export default DasboardPortfolioTooltip;
