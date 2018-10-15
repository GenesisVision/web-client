import "./asset-tooltip.scss";

import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import React from "react";
import { translate } from "react-i18next";

const AssetTooltip = ({ t, currency }) => {
  return (
    <div className="fund-period-tooltip">
      <div className="fund-period-tooltip__content">
        {CURRENCY_VALUES[currency]}
        <span className="asset__currency-short">{currency}</span>
      </div>
    </div>
  );
};

export default translate()(AssetTooltip);
