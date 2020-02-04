import { ASSET } from "constants/constants";
import React, { useCallback } from "react";

import ChartAsset from "./chart-asset";
import { TChartAsset } from "./multi-chart.types";
import { isIncluded } from "./service/multi-chart.service";

const _ChartAssetList: React.FC<Props> = ({
  assets,
  selectedAssets,
  onChange
}) => {
  const handleToggle = useCallback(
    (asset: string) => {
      if (isIncluded(selectedAssets, asset))
        onChange(selectedAssets.filter(name => asset !== name));
      else onChange([...selectedAssets, asset]);
    },
    [selectedAssets]
  );
  if (!assets.length) return <ChartAssetEmptyMessage />;
  return (
    <div className="multi-chart__asset-list">
      <ChartAssetSubList
        asset={ASSET.PROGRAM}
        assets={assets}
        selectedAssets={selectedAssets}
        handleToggle={handleToggle}
      />
      <ChartAssetSubList
        asset={ASSET.FUND}
        assets={assets}
        selectedAssets={selectedAssets}
        handleToggle={handleToggle}
      />
    </div>
  );
};

const _ChartAssetSubList: React.FC<IChartAssetSubListProps> = ({
  asset,
  assets,
  selectedAssets,
  handleToggle
}) => {
  const list = assets
    .filter(({ assetType }) => assetType === asset)
    .map(asset => (
      <ChartAsset
        key={asset.title}
        selected={isIncluded(selectedAssets, asset.id)}
        asset={asset}
        onToggle={handleToggle}
      />
    ));
  return (
    (list.length && (
      <div className="multi-chart__sub-list">
        <div className="multi-chart__separator">{asset}s</div>
        {list}
      </div>
    )) ||
    null
  );
};

interface IChartAssetSubListProps {
  asset: ASSET;
  assets: TChartAsset[];
  selectedAssets: string[];
  handleToggle: (asset: string) => void;
}

const ChartAssetSubList = React.memo(_ChartAssetSubList);

const ChartAssetEmptyMessage: React.FC = () => {
  return (
    <div className="multi-chart__asset-list">
      <div className="multi-chart__sub-list">
        <div className="multi-chart__separator">ASSETS</div>
        You don't have assets.
      </div>
    </div>
  );
};

interface Props {
  assets: TChartAsset[];
  selectedAssets: string[];
  onChange: (assets: string[]) => void;
}

const ChartAssetList = React.memo(_ChartAssetList);
export default ChartAssetList;
