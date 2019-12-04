// import managerApi from "shared/services/api-client/manager-api";
import { CancelablePromise } from "gv-api-web";
import authService from "services/auth-service";

export const programEditSignal = ({
  id,
  successFee,
  volumeFee
}: {
  id: string;
  successFee: number;
  volumeFee: number;
}): Promise<void> => {
  const authorization = authService.getAuthArg();
  const requestData = {
    programId: id,
    successFee,
    volumeFee
  };
  return new CancelablePromise<void>(() => {});
  // return managerApi
  //   .updateProgramSignalSettings(authorization, requestData)
};
