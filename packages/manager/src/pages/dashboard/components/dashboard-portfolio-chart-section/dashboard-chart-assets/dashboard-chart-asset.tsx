import { ManagerSimpleFund, ManagerSimpleProgram } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";

class _DashboardChartAsset extends React.PureComponent<Props> {
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
            level={"level" in chartAsset ? chartAsset.level : undefined}
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

interface Props {
  chartAsset: ManagerSimpleProgram | ManagerSimpleFund;
  type: ASSETS_TYPES;
  selectAsset: (id: string, title: string, type: ASSETS_TYPES) => void;
}

const DashboardChartAsset = translate()(_DashboardChartAsset);
export default DashboardChartAsset;
