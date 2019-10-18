import "./fund-asset-tooltip.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { CurrencyEnum } from "shared/utils/types";

interface IFundAssetTooltipProps {
  name: string;
  currency: CurrencyEnum;
}

const _FundAssetTooltip: React.FC<IFundAssetTooltipProps & WithTranslation> = ({
  t,
  name,
  currency
}) => (
  <div className="fund-asset-tooltip">
    <div className="fund-asset-tooltip__content">
      {name}
      <span className="fund-asset__currency-short">{currency}</span>
    </div>
  </div>
);

const FundAssetTooltip = translate()(React.memo(_FundAssetTooltip));
export default FundAssetTooltip;
