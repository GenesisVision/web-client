import { FILTER_TYPE } from "../../../helpers/filtering.helpers";
import { IComposeDefaultFilter } from "../../table.types";
import {
  ASSET_TYPE_FILTER_DEFAULT_VALUE,
  ASSET_TYPE_FILTER_NAME,
  ComposedRequestAssetValue
} from "./asset-type-filter.constants";

export const composeDefaultAssetTypeFilter = (): IComposeDefaultFilter => ({
  name: ASSET_TYPE_FILTER_NAME,
  composeRequestValue: (value): ComposedRequestAssetValue => value,
  defaultValue: ASSET_TYPE_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
});
