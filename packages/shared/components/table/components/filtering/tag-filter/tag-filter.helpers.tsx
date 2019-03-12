import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "./tag-filter.constants";
import { IComposeDefaultFilter } from "../../table.types";

export const programsTagFilter: IComposeDefaultFilter = {
  name: TAG_FILTER_NAME,
  composeRequestValue: (value: string[]) =>
    Array.isArray(value) ? [...value] : [value],
  defaultValue: TAG_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.CUSTOM
};
