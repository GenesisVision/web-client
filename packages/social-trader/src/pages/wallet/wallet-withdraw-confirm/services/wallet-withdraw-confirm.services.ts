import walletApi from "services/api-client/wallet-api";

export const confirmWithdraw = ({
  requestId,
  code
}: {
  requestId: string;
  code: string;
}) =>
  walletApi.confirmWithdrawalRequestByCode({
    requestId,
    code
  });
