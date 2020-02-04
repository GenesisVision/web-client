import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

import { IComposeDefaultFilter } from "../../table.types";
import {
  FUND_ASSET_DEFAULT_VALUE,
  FUND_ASSET_FILTER_NAME
} from "./fund-asset-filter.constants";

export const fundAssetFilter: IComposeDefaultFilter = {
  name: FUND_ASSET_FILTER_NAME,
  defaultValue: FUND_ASSET_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
};
