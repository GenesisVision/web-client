import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";

import { IComposeDefaultFilter } from "../../table.types";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "./tag-filter.constants";

export const programsTagFilter: IComposeDefaultFilter = {
  name: TAG_FILTER_NAME,
  defaultValue: TAG_FILTER_DEFAULT_VALUE,
  type: FILTER_TYPE.GENERAL
};
