import { ManagerProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw-popup";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { ManagerThunk } from "shared/utils/types";

export const getProgramWithdrawInfo = (
  id: string,
  currency: string
) => (): Promise<ManagerProgramWithdrawInfo> =>
  managerApi.getProgramWithdrawInfo(id, currency, authService.getAuthArg());

export const withdrawProgramById = (id: string, onClose: () => void) => (
  value: ProgramWithdrawType
): ManagerThunk<Promise<void>> => (dispatch): Promise<void> =>
  managerApi
    .withdrawFromProgram(id, value.amount, authService.getAuthArg())
    .then(() => {
      onClose();
      dispatch(
        alertMessageActions.success(
          "withdraw-program.success-alert-message",
          true
        )
      );
    });
