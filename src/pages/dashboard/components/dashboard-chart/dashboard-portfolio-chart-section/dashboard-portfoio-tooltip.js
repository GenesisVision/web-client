import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import Profitability from "components/profitability/profitability";
import React from "react";
import NumberFormat from "react-number-format";

import { BAR_COLORS } from "../dashboard-chart.constants";

const AssetsTooltipBody = ({ assets }) => {
  return Object.keys(assets)
    .filter(x => x.startsWith("asset"))
    .map((x, i) => (
      <div className="asset" key={i}>
        <div
          className="asset__indicator"
          style={{ background: BAR_COLORS[i] }}
        />
        <div className="asset__stats">
          <div className="asset__asset-title">{assets[x].asset.title}</div>
          <div className="asset__asset-value">{`${
            assets[x].asset.value
          } GVT`}</div>
        </div>
        <div className="asset__change">
          <div className="asset__change-percent">
            <Profitability
              variant="chips"
              value={assets[x].asset.changePercent}
            >
              <NumberFormat
                value={Math.abs(assets[x].asset.changePercent)}
                decimalScale={2}
                displayType="text"
                suffix="%"
              />
            </Profitability>
          </div>
          <div className="asset__change-value">{`${
            assets[x].asset.changeValue
          } GVT`}</div>
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

  const data = payload[0];
  if (data.name !== "balance")
    return (
      <ChartTooltip
        heading="Assets"
        body={<AssetsTooltipBody assets={data.payload} />}
        date={new Date(label)}
        className="assets-tooltip"
      />
    );

  return (
    <ChartTooltip
      heading="Total balance"
      body={`${data.value} GVT`}
      date={new Date(label)}
    />
  );
};
export default DasboardPortfolioTooltip;
