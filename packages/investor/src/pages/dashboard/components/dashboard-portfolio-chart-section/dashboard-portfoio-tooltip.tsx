import * as React from "react";
import NumberFormat from "react-number-format";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import { formatCurrencyValue } from "shared/utils/formatter";

import { BAR_COLORS } from "./dashboard-chart.constants";

const AssetsTooltipBody: React.FC<{ assets: any }> = ({ assets }) => (
  <>
    {Object.keys(assets)
      .filter(x => x.startsWith("asset"))
      .map((x, i) => (
        <AssetTooltip key={i} asset={assets[x].asset} i={i} />
      ))}
  </>
);

const AssetTooltip: React.FC<{ asset: any; i: number }> = ({ asset, i }) => (
  <div className="asset">
    <div className="asset__indicator" style={{ background: BAR_COLORS[i] }} />
    <div className="asset__stats">
      <div className="asset__asset-title">{asset.title}</div>
      <div className="asset__asset-value">{`${formatCurrencyValue(
        asset.value,
        "GVT"
      )} GVT`}</div>
    </div>
    <div className="asset__change">
      {asset.changePercent !== null && (
        <>
          <div className="asset__change-percent">
            <Profitability
              prefix={PROFITABILITY_PREFIX.ARROW}
              variant={PROFITABILITY_VARIANT.CHIPS}
              value={asset.changePercent}
            >
              <NumberFormat
                value={Math.abs(asset.changePercent)}
                decimalScale={2}
                displayType="text"
                suffix="%"
              />
            </Profitability>
          </div>
          <div className="asset__change-value">{`${formatCurrencyValue(
            asset.changeValue,
            "GVT"
          )} GVT`}</div>
        </>
      )}
    </div>
  </div>
);

const DashboardPortfolioTooltip: React.FC<Props> = ({
  active,
  label,
  payload
}) => {
  let data = payload[0];
  if (!active || !data) return null;
  if (data.name === "balance" && payload.length === 1) {
    return (
      <ChartTooltip
        heading="Total balance"
        body={<>{formatCurrencyValue(data.value, "GVT")} GVT</>}
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

interface Props {
  active: boolean;
  label: string;
  payload: any;
}

export default DashboardPortfolioTooltip;
