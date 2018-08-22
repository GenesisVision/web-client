import { RANGE_FILTER_TYPE } from "../../filtering/filtering.constants";

export const composeProgramsFilters = filtering => {
  return filtering.filters.reduce((prev, curr) => {
    switch (curr.type) {
      case RANGE_FILTER_TYPE:
        prev[`${curr.name}Min`] = curr.value[0];
        prev[`${curr.name}Max`] = curr.value[1];
        break;

      default:
        prev[curr.name] = curr.value;
    }
    return prev;
  }, {});
};
