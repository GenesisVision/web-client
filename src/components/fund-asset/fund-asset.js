import "./fund-asset.scss";

import classNames from "classnames";
import FundAssetImage from "components/avatar/fund-asset-image/fund-asset-image";
import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import React, { Component, Fragment } from "react";
import NumberFormat from "react-number-format";

export const FUND_ASSET_TYPE = {
  large: "large",
  middle: "middle",
  short: "short",
  text: "text"
};
class FundAsset extends Component {
  render() {
    const { percent, currency, type, last, icon } = this.props;
    return (
      (type === FUND_ASSET_TYPE.text && (
        <div>
          {currency}
          {percent && (
            <Fragment>
              &nbsp;
              <NumberFormat value={percent} suffix="%" displayType="text" />
            </Fragment>
          )}
          {!last && <span>,&nbsp;</span>}
        </div>
      )) || (
        <div
          className={classNames("fund-asset", {
            "fund-asset--large": type === FUND_ASSET_TYPE.large
          })}
        >
          <FundAssetImage url={icon} alt={currency} />

          {currency && (
            <div className="fund-asset__currencies">
              {type === FUND_ASSET_TYPE.large && (
                <div className="fund-asset__currency-full">
                  {CURRENCY_VALUES[currency]}
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
        </div>
      )
    );
  }
}

export default FundAsset;
