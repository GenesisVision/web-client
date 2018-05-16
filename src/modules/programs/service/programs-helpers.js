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
        prev[LEVEL_MIN_FILTER_NAME] = curr.value[0];
        prev[LEVEL_MAX_FILTER_NAME] = curr.value[1];
        break;
      case AVG_PROFIT_FILTER_NAME:
        prev[AVG_PROFIT_MIN_FILTER_NAME] = curr.value[0];
        prev[AVG_PROFIT_MAX_FILTER_NAME] = curr.value[1];
        break;
      default:
        prev[curr.name] = curr.value;
    }
    return prev;
  }, {});
};
