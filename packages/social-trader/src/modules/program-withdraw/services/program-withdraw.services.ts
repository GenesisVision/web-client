import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "modules/program-withdraw/program-withdraw-popup";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const getProgramWithdrawInfo = ({
  id
}: {
  id: string;
}): Promise<ProgramWithdrawInfo> =>
  api.investments(Token.create()).getProgramWithdrawInfo(id);

export const withdrawProgramById = ({
  id,
  value
}: {
  id: string;
  value: ProgramWithdrawType;
}) => api.investments(Token.create()).withdrawFromProgram(id, value);
