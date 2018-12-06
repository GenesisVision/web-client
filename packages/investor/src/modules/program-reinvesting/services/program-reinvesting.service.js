import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

const enableReinvesting = ({ programId, authorization }) => {
  return investorApi.v10InvestorProgramsByIdReinvestOnPost(
    programId,
    authorization
  );
};

const disableReinvesting = ({ programId, authorization }) => {
  return investorApi.v10InvestorProgramsByIdReinvestOffPost(
    programId,
    authorization
  );
};

export const toggleReinvesting = (programId, isReinvesting) => {
  if (!authService.getAuthArg()) return Promise.reject();

  const requestData = {
    programId,
    authorization: authService.getAuthArg()
  };

  return isReinvesting
    ? disableReinvesting(requestData)
    : enableReinvesting(requestData);
};
