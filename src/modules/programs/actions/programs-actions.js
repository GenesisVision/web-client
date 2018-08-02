export const PROGRAMS = "PROGRAMS";

const fetchPrograms = filters => {
  return {
    type: PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost()
  };
};

const programActions = {
  fetchPrograms
};

export default programActions;
