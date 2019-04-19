import { InternalTransferRequest } from "gv-api-web";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import { TransferFormValuesType } from "../components/wallet-transfer-form";

export const walletTransferRequest = (
  data: TransferFormValuesType
): Promise<any> => {
  const { sourceId, destinationId, transferAll,sourceType,
    destinationType } = data;
  return walletApi.v10WalletTransferPost(authService.getAuthArg(), {
    request: {
      amount: Number(data.amount),
      sourceId,
      destinationId,
      transferAll,
      sourceType,
      destinationType
    } as InternalTransferRequest
  });
};
