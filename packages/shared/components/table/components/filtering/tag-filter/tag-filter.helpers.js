import { FilterType } from "shared/components/table/helpers/filtering.helpers";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "./tag-filter.constants";

export const composeDefaultTagFilter = () => ({
  name: TAG_FILTER_NAME,
  composeRequestValue: value => value,
  defaultValue: TAG_FILTER_DEFAULT_VALUE,
  type: FilterType.custom
});
