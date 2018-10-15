import "./asset.scss";

import classNames from "classnames";
import Tooltip from "components/tooltip/tooltip";
import React, { Component } from "react";

import AssetTooltip from "../asset-tooltip/asset-tooltip";
import Asset, { ASSET_TYPE } from "./asset";

class AssetContainer extends Component {
  render() {
    const { assets, type, size, length } = this.props;
    return (
      <div
        className={classNames("assets", {
          "assets--text": type === ASSET_TYPE.text
        })}
      >
        {assets.map(
          (asset, idx) =>
            idx < size && (
              <Tooltip
                key={idx}
                render={() => <AssetTooltip currency={asset.asset} />}
              >
                <div>
                  <Asset
                    icon={asset.icon}
                    percent={asset.percent}
                    currency={asset.asset}
                    icon={asset.icon}
                    type={type}
                    last={idx === assets.length - 1}
                  />
                </div>
              </Tooltip>
            )
        )}
        {size < (length || assets.length) &&
          ((type === ASSET_TYPE.text && (
            <div>... +{assets.length - size}</div>
          )) || (
            <div className="asset__container">
              <div className="asset asset--others-count">
                +{(length || assets.length) - size}
              </div>{" "}
            </div>
          ))}
      </div>
    );
  }
}

export default AssetContainer;
