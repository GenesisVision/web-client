import "./fund-asset-tooltip.scss";

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
  <div className="fund-asset-tooltip">
    <div className="fund-asset-tooltip__content">
      <div className="fund-asset-tooltip__name"> {name}</div>
      <div className="fund-asset__currency-short">{currency}</div>
    </div>
  </div>
);

const FundAssetTooltip = React.memo(_FundAssetTooltip);
export default FundAssetTooltip;
