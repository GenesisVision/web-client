import "./fund-asset-tooltip.scss";

import React from "react";
import { translate } from "react-i18next";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";

const FundAssetTooltip = ({ t, name, currency }) => {
  return (
    <div className="fund-asset-tooltip">
      <div className="fund-asset-tooltip__content">
        {name || CURRENCY_VALUES[currency]}
        <span className="fund-asset__currency-short">{currency}</span>
      </div>
    </div>
  );
};

export default translate()(FundAssetTooltip);
