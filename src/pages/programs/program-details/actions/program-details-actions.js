import investorApi from "services/api-client/investor-api";

export const PROGRAM_DETAILS = "PROGRAM_DETAILS";

export const fetchProgramDetails = data => {
  return {
    type: PROGRAM_DETAILS,
    payload: 1 /* SwaggerInvestorApi.apiInvestorDashboardGet(
     data
    ) */
  };
};
