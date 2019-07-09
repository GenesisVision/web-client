import { ManagerSimpleFund, ManagerSimpleProgram } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";

const _DashboardChartAsset: React.FC<Props> = ({
  chartAsset,
  type,
  selectAsset
}) => {
  const handleClick = useCallback(
    () => selectAsset(chartAsset.id, chartAsset.title, type),
    [chartAsset, selectAsset, type]
  );
  return (
    <div
      className="dashboard-chart-assets-popover__chart-asset"
      onClick={handleClick}
    >
      <div className="dashboard-chart-assets-popover__logo">
        <AssetAvatar
          url={chartAsset.logo}
          alt={chartAsset.title}
          color={chartAsset.color}
          level={"level" in chartAsset ? chartAsset.level : undefined}
          levelProgress={
            "levelProgress" in chartAsset ? chartAsset.levelProgress : undefined
          }
        />
      </div>
      <div className="dashboard-chart-assets-popover__info">
        <div className="dashboard-chart-assets-popover__title">
          {chartAsset.title}
        </div>
      </div>
    </div>
  );
};

interface Props extends WithTranslation {
  chartAsset: ManagerSimpleProgram | ManagerSimpleFund;
  type: ASSETS_TYPES;
  selectAsset: (id: string, title: string, type: ASSETS_TYPES) => void;
}

const DashboardChartAsset = translate()(React.memo(_DashboardChartAsset));
export default DashboardChartAsset;
