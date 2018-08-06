import programApi from "services/api-client/program-api";

export const PROGRAMS = "PROGRAMS";

const fetchPrograms = filters => {
  return {
    type: PROGRAMS,
    payload: programApi.v10ProgramListGet(filters)
  };
};

const programActions = {
  fetchPrograms
};

export default programActions;
