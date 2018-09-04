import programsApi from "services/api-client/programs-api";

export const PROGRAM_DETAILS = "PROGRAM_DETAILS";

export const fetchProgramDetails = ({ programId, opts }) => {
  return {
    type: PROGRAM_DETAILS,
    payload: programsApi.v10ProgramsByIdGet(programId, opts)
  };
};
