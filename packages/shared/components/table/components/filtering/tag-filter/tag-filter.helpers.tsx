import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

import {
  ComposedRequestTagValue,
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME,
  TagFilterType
} from "./tag-filter.constants";
import { IComposeDefaultFilter } from "../../table.types";

export const programsTagFilter: IComposeDefaultFilter = {
  name: TAG_FILTER_NAME,
  composeRequestValue: (value: TagFilterType): ComposedRequestTagValue =>
    Array.isArray(value) ? [...value] : [value],
  defaultValue: TAG_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.CUSTOM
};
