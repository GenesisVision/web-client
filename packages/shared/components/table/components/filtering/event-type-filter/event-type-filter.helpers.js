import { FilterType } from "../../../helpers/filtering.helpers";
import {
  EVENT_TYPE_FILTER_DEFAULT_VALUE,
  EVENT_TYPE_FILTER_NAME
} from "./event-type-filter.constants";

export const composeDefaultEventTypeFilter = () => ({
  name: EVENT_TYPE_FILTER_NAME,
  composeRequestValue: value => value,
  defaultValue: EVENT_TYPE_FILTER_DEFAULT_VALUE,
  type: FilterType.general
});
