import "./fund-asset-tooltip.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import { CurrencyEnum } from "shared/utils/types";

interface IFundAssetTooltipProps {
  name: string;
  currency: CurrencyEnum;
}

const _FundAssetTooltip: React.FC<
  IFundAssetTooltipProps & InjectedTranslateProps
> = ({ t, name, currency }) => (
  <div className="fund-asset-tooltip">
    <div className="fund-asset-tooltip__content">
      {name || CURRENCY_VALUES[currency]}
      <span className="fund-asset__currency-short">{currency}</span>
    </div>
  </div>
);

const FundAssetTooltip = translate()(React.memo(_FundAssetTooltip));
export default FundAssetTooltip;
