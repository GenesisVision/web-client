import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import React, { Component } from "react";
import { translate } from "react-i18next";

class DashboardChartAsset extends Component {
  handleClick = () => {
    const { chartAsset, type, selectAsset } = this.props;
    selectAsset(chartAsset.id, chartAsset.title, type);
  };
  render() {
    const { chartAsset } = this.props;
    return (
      <div
        className="dashboard-chart-assets-popover__chart-asset"
        onClick={this.handleClick}
      >
        <div className="dashboard-chart-assets-popover__logo">
          <AssetAvatar
            url={chartAsset.logo}
            alt={chartAsset.title}
            color={chartAsset.color}
            level={chartAsset.level}
          />
        </div>
        <div className="dashboard-chart-assets-popover__info">
          <div className="dashboard-chart-assets-popover__title">
            {chartAsset.title}
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(DashboardChartAsset);
