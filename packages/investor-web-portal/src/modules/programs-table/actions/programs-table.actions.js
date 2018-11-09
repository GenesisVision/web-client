import programApi from "services/api-client/programs-api";

export const PROGRAMS = "PROGRAMS";

export const fetchPrograms = filters => {
  return {
    type: PROGRAMS,
    payload: programApi.v10ProgramsGet(filters)
  };
};
