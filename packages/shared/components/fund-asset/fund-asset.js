import "./fund-asset.scss";

import classnames from "classnames";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";

export const FUND_ASSET_TYPE = {
  large: "large",
  middle: "middle",
  short: "short",
  text: "text"
};
class FundAsset extends Component {
  render() {
    const {
      name,
      percent,
      currency,
      type,
      last,
      removable,
      removeHandle,
      icon,
      className
    } = this.props;
    return (
      (type === FUND_ASSET_TYPE.text && (
        <div>
          {currency}
          &nbsp;
          <NumberFormat value={percent} suffix="%" displayType="text" />
          {!last && <span>,&nbsp;</span>}
        </div>
      )) || (
        <div
          className={classnames(
            "fund-asset",
            "fund-asset--default",
            className,
            {
              "fund-asset--large": type === FUND_ASSET_TYPE.large
            }
          )}
        >
          <FundAssetImage url={icon} alt={currency} />

          {currency && (
            <div className="fund-asset__currencies">
              {type === FUND_ASSET_TYPE.large && (
                <div className="fund-asset__currency-full">
                  {name || CURRENCY_VALUES[currency]}
                </div>
              )}
              {type !== FUND_ASSET_TYPE.short && (
                <div className="fund-asset__currency-short">{currency}</div>
              )}
            </div>
          )}
          <div className="fund-asset__percent">
            <NumberFormat value={percent} suffix="%" displayType="text" />
          </div>
          {removable && (
            <div
              className="fund-asset__remove-button"
              onClick={removeHandle(currency)}
            >
              +
            </div>
          )}
        </div>
      )
    );
  }
}

export default FundAsset;
