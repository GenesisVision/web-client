import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

import { IComposeDefaultFilter } from "../../table.types";
import {
  ComposedRequestTagValue,
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME,
  TagFilterType
} from "./tag-filter.constants";

export const programsTagFilter: IComposeDefaultFilter = {
  name: TAG_FILTER_NAME,
  defaultValue: TAG_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
};
