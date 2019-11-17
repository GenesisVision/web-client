import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "shared/components/program-withdraw/program-withdraw-popup";
import investmentsApi from "shared/services/api-client/investments-api";
import authService from "shared/services/auth-service";

export const getProgramWithdrawInfo = ({
  id
}: {
  id: string;
}): Promise<ProgramWithdrawInfo> =>
  investmentsApi.getProgramWithdrawInfo(id, authService.getAuthArg());

export const withdrawProgramById = ({
  id,
  value
}: {
  id: string;
  value: ProgramWithdrawType;
}) => investmentsApi.withdrawFromProgram(id, authService.getAuthArg(), value);
