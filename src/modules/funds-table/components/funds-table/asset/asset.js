import "./asset.scss";

import classNames from "classnames";
import { HEADER_CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import fileService from "shared/services/file-service";

export const ASSET_TYPE = {
  large: "large",
  middle: "middle",
  short: "short",
  text: "text"
};
class Asset extends Component {
  render() {
    const { percent, currency, type, last, icon } = this.props;
    return (
      (type === ASSET_TYPE.text && (
        <div>
          {currency}
          &nbsp;
          <NumberFormat value={percent} suffix="%" displayType="text" />
          {!last && <span>,&nbsp;</span>}
        </div>
      )) || (
        <div
          className={classNames("asset", {
            "asset--large": type === ASSET_TYPE.large
          })}
        >
          <div className="asset__icon">
            <img
              src={fileService.getFileUrl(icon)}
              alt=""
              className="asset__icon-img"
            />
          </div>
          {currency && (
            <div className="asset__currencies">
              {type === ASSET_TYPE.large && (
                <div className="asset__currency-full">
                  {HEADER_CURRENCY_VALUES[currency]}
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
