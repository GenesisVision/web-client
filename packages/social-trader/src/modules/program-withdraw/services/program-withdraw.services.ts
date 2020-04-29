import { ProgramWithdrawInfo } from "gv-api-web";
import { ProgramWithdrawType } from "modules/program-withdraw/program-withdraw-popup";
import { api } from "services/api-client/swagger-custom-client";

export const getProgramWithdrawInfo = ({
  id
}: {
  id: string;
}): Promise<ProgramWithdrawInfo> =>
  api.investments().getProgramWithdrawInfo(id);

export const withdrawProgramById = ({
  id,
  value
}: {
  id: string;
  value: ProgramWithdrawType;
}) => api.investments().withdrawFromProgram(id, value);
