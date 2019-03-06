import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

const enableReinvesting = (programId: string) => {
  const authorization = authService.getAuthArg();
  return investorApi.v10InvestorProgramsByIdReinvestOnPost(
    programId,
    authorization
  );
};

const disableReinvesting = (programId: string) => {
  const authorization = authService.getAuthArg();
  return investorApi.v10InvestorProgramsByIdReinvestOffPost(
    programId,
    authorization
  );
};

export const toggleReinvesting = (
  programId: string,
  isReinvesting: boolean
) => {
  return isReinvesting
    ? enableReinvesting(programId)
    : disableReinvesting(programId);
};
