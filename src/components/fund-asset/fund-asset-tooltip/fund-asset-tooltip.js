import "./fund-asset-tooltip.scss";

import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import React from "react";
import { translate } from "react-i18next";

const FundAssetTooltip = ({ t, currency }) => {
  return (
    <div className="fund-asset-tooltip">
      <div className="fund-asset-tooltip__content">
        {CURRENCY_VALUES[currency]}
        <span className="fund-asset__currency-short">{currency}</span>
      </div>
    </div>
  );
};

export default translate()(FundAssetTooltip);
