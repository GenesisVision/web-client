import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import Profitability from "shared/components/profitability/profitability";
import { formatCurrencyValue } from "shared/utils/formatter";

import { BAR_COLORS } from "./dashboard-chart.constants";

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
          <div className="asset__asset-value">{`${formatCurrencyValue(
            assets[x].asset.value,
            "GVT"
          )} GVT`}</div>
        </div>
        <div className="asset__change">
          {assets[x].asset.changePercent !== null && (
            <Fragment>
              <div className="asset__change-percent">
                <Profitability
                  prefix="arrow"
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
              <div className="asset__change-value">{`${formatCurrencyValue(
                assets[x].asset.changeValue,
                "GVT"
              )} GVT`}</div>
            </Fragment>
          )}
        </div>
      </div>
    ));
};
const DasboardPortfolioTooltip = ({ active, label, payload, date }) => {
  if (!active) return null;

  let data = payload[0];
  if (!data) return null;
  if (data.name === "balance" && payload.length === 1) {
    return (
      <ChartTooltip
        heading="Total balance"
        body={`${formatCurrencyValue(data.value, "GVT")} GVT`}
        date={new Date(label)}
      />
    );
  }
  if (data.name === "balance") {
    const [, ...assets] = payload;
    data = assets[0];
  }

  return (
    <ChartTooltip
      heading="Assets"
      body={<AssetsTooltipBody assets={data.payload} />}
      date={new Date(label)}
      className="assets-tooltip"
    />
  );
};
export default DasboardPortfolioTooltip;
