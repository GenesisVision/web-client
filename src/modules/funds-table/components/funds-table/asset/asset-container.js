import "./asset.scss";
import React, { Component, Fragment } from "react";
import Asset, { TYPES } from "./asset";
import classNames from "classnames";

class AssetContainer extends Component {
  render() {
    const { assets, type } = this.props;
    return (
      <div
        className={classNames("assets", {
          "assets--text": type === TYPES.text
        })}
      >
        {assets.map((asset, idx) => (
          <Fragment key={idx}>
            <Asset
              icon={asset.icon}
              percent={asset.percent || asset.assetPart}
              currency={asset.symbol}
              type={type}
            />
            {type === TYPES.text &&
              idx !== assets.length - 1 && <span>,&nbsp;</span>}
          </Fragment>
        ))}
      </div>
    );
  }
}

export default AssetContainer;
