import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw-popup";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { InvestorThunk } from "shared/utils/types";

export const getProgramWithdrawInfo = (
  id: string,
  currency: string
) => (): Promise<ProgramWithdrawInfo> => {
  return investorApi.getProgramWithdrawInfo(
    id,
    currency,
    authService.getAuthArg()
  );
};

export const withdrawProgramById = (id: string, onClose: () => void) => (
  values: ProgramWithdrawType
): InvestorThunk<Promise<void>> => (dispatch): Promise<void> => {
  return investorApi
    .withdrawFromProgram(id, authService.getAuthArg(), values)
    .then(() => {
      onClose();
      dispatch(
        alertMessageActions.success(
          "withdraw-program.success-alert-message",
          true
        )
      );
    });
};
