import "./asset.scss";
import React, { Component } from "react";
import classNames from "classnames";
import NumberFormat from "react-number-format";
import BTC from "shared/media/BTC.png";
export const ASSET_TYPE = {
  large: "large",
  middle: "middle",
  short: "short",
  text: "text"
};
const FULL_CURRENCIES = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  GVT: "Genesis Vision"
};
class Asset extends Component {
  render() {
    const { percent, currency, type } = this.props;
    return (
      (type === ASSET_TYPE.text && (
        <div>
          {currency}
          &nbsp;
          <NumberFormat value={percent} suffix="%" displayType="text" />
        </div>
      )) || (
        <div
          className={classNames("asset", {
            "asset--large": type === ASSET_TYPE.large
          })}
        >
          <div className="asset__icon">
            <img src={BTC} alt="" className="asset__icon-img" />
          </div>
          {currency && (
            <div className="asset__currencies">
              {type === ASSET_TYPE.large && (
                <div className="asset__currency-full">
                  {FULL_CURRENCIES[currency]}
                </div>
              )}
              {type !== ASSET_TYPE.short && (
                <div className="asset__currency-short">{currency}</div>
              )}
            </div>
          )}
          <div className="asset__percent">
            <NumberFormat value={percent} suffix="%" displayType="text" />
          </div>
        </div>
      )
    );
  }
}

export default Asset;
