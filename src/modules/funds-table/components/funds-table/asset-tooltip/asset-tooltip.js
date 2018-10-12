import "./asset-tooltip.scss";

import React from "react";
import { translate } from "react-i18next";

import { HEADER_CURRENCY_VALUES } from "../../../../currency-select/currency-select.constants";

const AssetTooltip = ({ t, currency }) => {
  return (
    <div className="fund-period-tooltip">
      <div className="fund-period-tooltip__content">
        {HEADER_CURRENCY_VALUES[currency]}
        <span className="asset__currency-short">{currency}</span>
      </div>
    </div>
  );
};

export default translate()(AssetTooltip);
