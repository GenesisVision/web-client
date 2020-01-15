import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "modules/program-withdraw/program-withdraw-popup";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";

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
