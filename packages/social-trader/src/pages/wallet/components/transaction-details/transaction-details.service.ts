import { api, Token } from "services/api-client/swagger-custom-client";

export const cancelWithdrawalRequestMethod = (id: string) =>
  api.wallet(Token.create()).cancelWithdrawalRequest(id);

export const resendWithdrawalRequestEmailMethod = (id: string) =>
  api.wallet(Token.create()).resendWithdrawalRequestEmail(id);
