export const ASSET_TYPE_FILTER_NAME = "assetType";

export enum ASSETS_TYPES {
  All = "All",
  Signal = "Signal",
  Program = "Program",
  Fund = "Fund"
}

export const ASSET_TYPE_FILTER_DEFAULT_VALUE = "All";

export type AssetFilterType = ASSETS_TYPES;

export type ComposedRequestAssetName = "assetType";
export type ComposedRequestAssetValue = ASSETS_TYPES;
