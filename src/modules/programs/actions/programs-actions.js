import programApi from "services/api-client/program-api";

export const PROGRAMS = "PROGRAMS";

export const fetchPrograms = filters => {
  return {
    type: PROGRAMS,
    payload: programApi.v10ProgramListGet(filters)
  };
};
