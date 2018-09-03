import { FilterType } from "../../filtering/filtering.constants";

export const composeProgramsFilters = filtering => {
  return Object.keys(filtering)
    .map(i => ({ name: i, ...filtering[i] }))
    .reduce((prev, curr) => {
      switch (curr.type) {
        case FilterType.range:
          if (curr.value !== undefined) {
            prev[`${curr.name}Min`] = curr.value[0];
            prev[`${curr.name}Max`] = curr.value[1];
          }
          break;
        case FilterType.custom:
          const requestValues = curr.composeRequestValue(curr.value);
          prev = { ...prev, ...requestValues };
          break;
        case FilterType.general:
        default:
          if (curr.value !== undefined) {
            prev[curr.name] = curr.value;
          }
      }
      return prev;
    }, {});
};
