import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw-popup";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";
import { CurrencyEnum, ManagerThunk } from "shared/utils/types";
import investmentsApi from "shared/services/api-client/investments-api";

export const getProgramWithdrawInfo = (
  id: string,
  currency: CurrencyEnum
) => (): Promise<ProgramWithdrawInfo> =>
  investmentsApi.getProgramWithdrawInfo(id, authService.getAuthArg());

export const withdrawProgramById = (id: string, onClose: () => void) => (
  value: ProgramWithdrawType
): ManagerThunk<Promise<void>> => (dispatch): Promise<void> =>
  investmentsApi
    .withdrawFromProgram(id, authService.getAuthArg(), value)
    .then(() => {
      onClose();
      dispatch(
        alertMessageActions.success(
          "withdraw-program.success-alert-message",
          true
        )
      );
    });
