import "./asset.scss";
import React, { Component } from "react";
import classNames from "classnames";
import NumberFormat from "react-number-format";
import BTC from "shared/media/BTC.png";
const SIZES = {
  large: "large",
  short: "short"
};
const FULL_CURRENCIES = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  GVT: "Genesis Vision"
};
class Asset extends Component {
  render() {
    const { percent, currency, size } = this.props;
    return (
      <div
        className={classNames("asset", {
          "asset--large": size === SIZES.large
        })}
      >
        <img src={BTC} alt="" className="asset__icon-img" />
        {currency && (
          <div className="asset__currencies">
            {size === SIZES.large && (
              <div className="asset__currency-full">
                {FULL_CURRENCIES[currency]}
              </div>
            )}
            <div className="asset__currency-short">{currency}</div>
          </div>
        )}
        <div className="asset__percent">
          <NumberFormat value={percent} suffix="%" displayType="text" />
        </div>
      </div>
    );
  }
}

export default Asset;
