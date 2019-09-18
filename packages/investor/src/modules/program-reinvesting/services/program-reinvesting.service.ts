import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

const enableReinvesting = (programId: string): Promise<void> => {
  const authorization = authService.getAuthArg();
  return investorApi.v10InvestorProgramsByIdReinvestOnPost(
    programId,
    authorization
  );
};

const disableReinvesting = (programId: string): Promise<void> => {
  const authorization = authService.getAuthArg();
  return investorApi.v10InvestorProgramsByIdReinvestOffPost(
    programId,
    authorization
  );
};

export const toggleReinvesting = ({
  programId,
  isReinvesting
}: {
  programId: string;
  isReinvesting: boolean;
}): Promise<void> => {
  return isReinvesting
    ? enableReinvesting(programId)
    : disableReinvesting(programId);
};
