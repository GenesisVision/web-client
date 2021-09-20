import { InternalTransferRequest } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const transferCoins = (body: InternalTransferRequest): Promise<any> =>
  api.coins().transfer({
    body
  });
