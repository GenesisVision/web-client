import { api, Token } from "services/api-client/swagger-custom-client";

export const confirmWithdraw = ({
  requestId,
  code
}: {
  requestId: string;
  code: string;
}) =>
  api.wallet(Token.create()).confirmWithdrawalRequestByCode({
    requestId,
    code
  });
