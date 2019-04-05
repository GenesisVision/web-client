import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw-popup";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";
import { IntestorThunk } from "shared/utils/types";

export const getProgramWithdrawInfo = (
  id: string,
  currency: string
) => (): Promise<ProgramWithdrawInfo> => {
  return investorApi.v10InvestorProgramsByIdWithdrawInfoByCurrencyGet(
    id,
    currency,
    authService.getAuthArg()
  );
};

export const withdrawProgramById = (id: string, onClose: () => void) => (
  value: ProgramWithdrawType
): IntestorThunk<Promise<void>> => (dispatch): Promise<void> => {
  return investorApi
    .v10InvestorProgramsByIdWithdrawMultiByAmountPost(
      id,
      value.amount,
      authService.getAuthArg()
    )
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
