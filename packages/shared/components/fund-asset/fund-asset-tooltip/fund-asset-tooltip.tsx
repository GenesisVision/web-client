import "./fund-asset-tooltip.scss";

import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";

interface IFundAssetTooltipProps {
  name: string;
  currency: string;
}

const FundAssetTooltip: React.FC<IFundAssetTooltipProps & WithTranslation> = ({
  t,
  name,
  currency
}) => {
  return (
    <div className="fund-asset-tooltip">
      <div className="fund-asset-tooltip__content">
        {name || CURRENCY_VALUES[currency]}
        <span className="fund-asset__currency-short">{currency}</span>
      </div>
    </div>
  );
};

export default withTranslation()(FundAssetTooltip);
