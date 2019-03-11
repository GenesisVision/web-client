export const ASSET_TYPE_FILTER_NAME = "assetType";

export const ASSETS_TYPES_old = {
  All: "All",
  Program: "Program",
  Fund: "Fund"
};

export enum ASSETS_TYPES {
  All = "All",
  Program = "Program",
  Fund = "Fund"
}

export const ASSET_TYPE_FILTER_VALUES = [...Object.keys(ASSETS_TYPES)].map(
  x => ({ value: x, label: x })
);

export const ASSET_TYPE_FILTER_DEFAULT_VALUE = "All";
