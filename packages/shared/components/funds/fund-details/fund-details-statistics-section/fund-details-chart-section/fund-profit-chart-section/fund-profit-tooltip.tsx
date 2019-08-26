import * as React from "react";
import ChartTooltip from "shared/components/chart/chart-tooltip/chart-tooltip";
import FundAssetList from "shared/components/fund-asset-list/fund-asset-list";
import FundAssetRatio from "shared/components/fund-asset-ratio/fund-asset-ratio";

const FundProfitTooltip: React.FC<Props> = ({ active, label, payload }) => {
  if (!active || !payload.length) return null;
  return (
    <ChartTooltip
      heading="Assets fund"
      date={new Date(label)}
      body={
        <div>
          <FundAssetRatio
            values={payload[0].payload.assets}
            showBounds={false}
          />
          <FundAssetList values={payload[0].payload.assets} />
        </div>
      }
    />
  );
};

interface Props {
  active: boolean;
  label: string;
  payload: any[];
}

export default FundProfitTooltip;
