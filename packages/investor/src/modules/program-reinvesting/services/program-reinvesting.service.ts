import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

const enableReinvesting = (programId: string): Promise<null> => {
  const authorization = authService.getAuthArg();
  return investorApi.switchReinvestOn(programId, authorization);
};

const disableReinvesting = (programId: string): Promise<null> => {
  const authorization = authService.getAuthArg();
  return investorApi.switchReinvestOff(programId, authorization);
};

export const toggleReinvesting = ({
  programId,
  isReinvesting
}: {
  programId: string;
  isReinvesting: boolean;
}): Promise<null> => {
  return isReinvesting
    ? enableReinvesting(programId)
    : disableReinvesting(programId);
};
