import { FUND_CURRENCY } from "constants/constants";
import { api, Token } from "services/api-client/swagger-custom-client";

import { FundWithdraw, FundWithdrawInfoResponse } from "../fund-withdraw.types";

export const getFundWithdrawInfo = ({
  id
}: {
  id: string;
}): Promise<FundWithdrawInfoResponse> => {
  const token = Token.create();
  return Promise.all([
    api.investments(token).getFundWithdrawInfo(id, {
      currency: FUND_CURRENCY
    }),
    api.wallet(token).getWalletAvailable(FUND_CURRENCY)
  ]).then(([withdrawInfo, walletMulti]) => ({
    withdrawInfo,
    wallets: walletMulti.wallets
  }));
};

export const withdrawFund = ({
  value,
  id
}: {
  value: FundWithdraw;
  id: string;
}): any => api.investments(Token.create()).withdrawFromFund(id, value);
