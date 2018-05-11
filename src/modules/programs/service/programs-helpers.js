import {
  LEVEL_FILTER_NAME,
  LEVEL_MIN_FILTER_NAME,
  LEVEL_MAX_FILTER_NAME,
  AVG_PROFIT_FILTER_NAME,
  AVG_PROFIT_MIN_FILTER_NAME,
  AVG_PROFIT_MAX_FILTER_NAME
} from "../programs.constants";

export const composeProgramsFilters = filtering => {
  return filtering.filters.reduce((prev, curr) => {
    switch (curr.name) {
      case LEVEL_FILTER_NAME:
        prev[LEVEL_MIN_FILTER_NAME] = curr.value.min;
        prev[LEVEL_MAX_FILTER_NAME] = curr.value.max;
        break;
      case AVG_PROFIT_FILTER_NAME:
        prev[AVG_PROFIT_MIN_FILTER_NAME] = curr.value.min;
        prev[AVG_PROFIT_MAX_FILTER_NAME] = curr.value.max;
        break;
      default:
        prev[curr.name] = curr.value;
    }
    return prev;
  }, {});
};
