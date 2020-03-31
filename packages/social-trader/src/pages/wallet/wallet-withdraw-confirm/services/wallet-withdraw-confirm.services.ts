import { api } from "services/api-client/swagger-custom-client";

export const confirmWithdraw = ({
  requestId,
  code
}: {
  requestId: string;
  code: string;
}) =>
  api.wallet().confirmWithdrawalRequestByCode({
    requestId,
    code
  });
