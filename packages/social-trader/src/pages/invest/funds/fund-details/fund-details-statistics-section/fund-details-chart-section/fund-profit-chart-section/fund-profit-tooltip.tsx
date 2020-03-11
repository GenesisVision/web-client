import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import FundAssetList from "components/fund-asset-list/fund-asset-list";
import FundAssetRatio from "components/fund-asset-ratio/fund-asset-ratio";
import { Row } from "components/row/row";
import * as React from "react";

const FundProfitTooltip: React.FC<Props> = ({ active, label, payload }) => {
  if (!active || !payload.length) return null;
  return (
    <ChartTooltip
      heading={"Assets"}
      date={new Date(label)}
      body={
        <div>
          <Row>
            <FundAssetRatio
              values={payload[0].payload.assets}
              showBounds={false}
            />
          </Row>
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
