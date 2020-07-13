import {
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import { PlatformAssetFull } from "utils/types";

export type AssetType =
  | PlatformAsset
  | FundAssetPart
  | FundAssetPartWithIcon
  | PlatformAssetFull;

export type PercentWithAssetType = { percent: number; asset: string };

const MAX_PERCENT = 100;

export const mapToPercentWithAsset = ({
  percent,
  asset
}: {
  [key: string]: any;
}): PercentWithAssetType => ({ percent, asset });

export const compareAssets = (
  first: Array<AssetType>,
  second: Array<AssetType>
): boolean => {
  const mappedFirst = first.map(mapToPercentWithAsset);
  const mappedSecond = second.map(mapToPercentWithAsset);
  if (
    !mappedFirst ||
    !mappedSecond ||
    mappedFirst.length !== mappedSecond.length
  )
    return false;
  for (const i in mappedFirst) {
    if (
      mappedFirst[i].asset + mappedFirst[i].percent !==
      mappedSecond[i].asset + mappedSecond[i].percent
    )
      return false;
  }
  return true;
};

export const composeSelectedAssets = (
  assetsPercents: FundAssetPart[],
  assets: PlatformAsset[]
): PlatformAssetFull[] =>
  assets.map(asset => {
    const targetAsset = assetsPercents.find(x => x.id === asset.id);
    const percent = targetAsset
      ? targetAsset.percent
      : asset.mandatoryFundPercent;
    return { ...asset, percent };
  });

export const getRemainder = (assets: { percent: number }[]) =>
  MAX_PERCENT - assets.reduce((sum, item) => sum + item.percent, 0);

export const getRemainderWithoutSelected = (
  asset: FundAssetPartWithIcon,
  assets: PlatformAssetFull[]
) =>
  MAX_PERCENT -
  assets
    .filter(item => item.asset !== asset.asset)
    .reduce((sum, item) => sum + item.percent, 0);
