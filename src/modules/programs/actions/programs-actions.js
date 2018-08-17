import programApi from "services/api-client/program-api";

export const PROGRAMS = "PROGRAMS";
export const PROGRAMS_CHANGE_TAB = "PROGRAMS_CHANGE_TAB";

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
