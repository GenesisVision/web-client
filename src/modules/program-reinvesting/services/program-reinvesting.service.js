import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";

const enableReinvesting = ({ programId, authorization }) => {
  return investorApiProxy.v10InvestorProgramsByIdReinvestOnPost(
    programId,
    authorization
  );
};

const disableReinvesting = ({ programId, authorization }) => {
  return investorApiProxy.v10InvestorProgramsByIdReinvestOffPost(
    programId,
    authorization
  );
};

export const toggleReinvesting = (programId, isReinvesting) => {
  if (!authService.getAuthArg()) return;

  const requestData = {
    programId,
    authorization: authService.getAuthArg()
  };

  return isReinvesting
    ? disableReinvesting(requestData)
    : enableReinvesting(requestData);
};
