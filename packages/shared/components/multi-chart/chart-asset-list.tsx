import React, { useCallback } from "react";
import { ASSET } from "shared/constants/constants";

import ChartAsset from "./chart-asset";
import { TChartAsset } from "./multi-chart.types";
import { isIncluded } from "./service/multi-chart.service";

const ChartAssetList: React.FC<Props> = ({
  assets,
  selectedAssets,
  onChange
}) => {
  const handleToggle = useCallback(
    (asset: TChartAsset) => {
      if (isIncluded(selectedAssets, asset.name))
        onChange(selectedAssets.filter(({ name }) => asset.name !== name));
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
    .filter(({ type }) => type === asset)
    .map(asset => (
      <ChartAsset
        key={asset.name}
        selected={isIncluded(selectedAssets, asset.name)}
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
  selectedAssets: TChartAsset[];
  handleToggle: (assets: TChartAsset) => void;
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
  selectedAssets: TChartAsset[];
  onChange: (assets: TChartAsset[]) => void;
}
export default ChartAssetList;
