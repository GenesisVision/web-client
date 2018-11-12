import investorApi from "shared/services/api-client/investor-api";

export const PROGRAM_REINVEST = "PROGRAM_REINVEST";

export const enableReinvesting = ({ programId, authorization }) => {
  return {
    type: PROGRAM_REINVEST,
    payload: investorApi.v10InvestorProgramsByIdReinvestOnPost(
      programId,
      authorization
    ),
    meta: {
      isInvesting: true
    }
  };
};

export const disableReinvesting = ({ programId, authorization }) => {
  return {
    type: PROGRAM_REINVEST,
    payload: investorApi.v10InvestorProgramsByIdReinvestOffPost(
      programId,
      authorization
    ),
    meta: {
      isInvesting: false
    }
  };
};
