import "./asset.scss";
import React, { Component, Fragment } from "react";
import Asset, { ASSET_TYPE } from "./asset";
import classNames from "classnames";

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
              <Fragment key={idx}>
                <Asset
                  icon={asset.icon}
                  percent={asset.percent || asset.assetPart}
                  currency={asset.symbol}
                  type={type}
                />
                {type === ASSET_TYPE.text &&
                  idx !== assets.length - 1 && <span>,&nbsp;</span>}
              </Fragment>
            )
        )}
        {size < (length || assets.length) &&
          ((type === ASSET_TYPE.text && (
            <div>... +{assets.length - size}</div>
          )) || (
            <div className="asset">+{(length || assets.length) - size}</div>
          ))}
      </div>
    );
  }
}

export default AssetContainer;
