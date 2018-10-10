import "./asset.scss";
import React, { Component } from "react";
import Asset from "./asset";

class AssetContainer extends Component {
  render() {
    const { assets } = this.props;
    return (
      <div className="assets">
        {assets.map((asset, idx) => (
          <Asset key={idx} icon={asset.icon} percent={asset.percent} />
        ))}
      </div>
    );
  }
}

export default AssetContainer;
