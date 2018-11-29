import programApi from "shared/services/api-client/programs-api";

export const PROGRAMS_RATING = "PROGRAMS_RATING";
export const SELF_PROGRAMS_RATING = "SELF_PROGRAMS_RATING";
export const LEVELUP_SUMMARY = "LEVELUP_SUMMARY";

export const fetchProgramsRating = filters => {
  return {
    type: PROGRAMS_RATING,
    payload: programApi.v10ProgramsGet(filters)
  };
};

export const fetchSelfProgramsRating = filters => {
  return {
    type: SELF_PROGRAMS_RATING,
    payload: programApi.v10ProgramsGet(filters)
  };
};

export const fetchLevelUpSummary = authorization => {
  return {
    type: LEVELUP_SUMMARY,
    payload: programApi.v10ProgramsLevelupSummaryGet(authorization)
  };
};
