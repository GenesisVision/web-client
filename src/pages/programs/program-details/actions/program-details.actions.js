import programsApi from "services/api-client/programs-api";

export const PROGRAM_DETAILS = "PROGRAM_DETAILS";
export const PROGRAM_CHART = "PROGRAM_CHART";

export const fetchProgramDetails = ({ programId, opts }) => {
  return {
    type: PROGRAM_DETAILS,
    payload: programsApi.v10ProgramsByIdGet(programId, opts)
  };
};

export const fetchProgramChart = ({ programId, opts }) => {
  return {
    type: PROGRAM_CHART,
    payload: programsApi.v10ProgramsByIdChartGet(programId, opts)
  };
};
