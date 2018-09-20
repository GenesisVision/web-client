import {
  ASSET_TYPE_FILTER_DEFAULT_VALUE,
  ASSET_TYPE_FILTER_NAME
} from "./asset-type-filter.constants";

export const composeDefaultAssetTypeFilter = () => ({
  name: ASSET_TYPE_FILTER_NAME,
  composeRequestValue: value => value,
  defaultValue: ASSET_TYPE_FILTER_DEFAULT_VALUE
});
