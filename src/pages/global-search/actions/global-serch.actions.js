import programApi from "services/api-client/programs-api";

export const GLOBAL_SEARCH_QUERY_VALUE = "GLOBAL_SEARCH_QUERY_VALUE";
export const GLOBAL_SEARCH_PROGRAMS = "GLOBAL_SEARCH_PROGRAMS";

export const setQueryValue = query => ({
  type: GLOBAL_SEARCH_QUERY_VALUE,
  payload: query
});

export const fetchPrograms = filters => {
  return {
    type: GLOBAL_SEARCH_PROGRAMS,
    payload: programApi.v10ProgramsGet(filters)
  };
};
