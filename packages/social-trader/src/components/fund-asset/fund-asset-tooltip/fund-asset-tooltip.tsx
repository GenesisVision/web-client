import "./fund-asset-tooltip.scss";

import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

interface IFundAssetTooltipProps {
  name: string;
  currency: CurrencyEnum;
}

const _FundAssetTooltip: React.FC<IFundAssetTooltipProps> = ({
  name,
  currency
}) => (
  <TooltipContent fixed={false}>
    <div className="fund-asset-tooltip__content">
      <div className="fund-asset-tooltip__name"> {name}</div>
      <div className="fund-asset__currency-short">{currency}</div>
    </div>
  </TooltipContent>
);

const FundAssetTooltip = React.memo(_FundAssetTooltip);
export default FundAssetTooltip;
