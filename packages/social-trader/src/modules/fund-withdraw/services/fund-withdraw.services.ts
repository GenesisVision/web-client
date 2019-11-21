import {
  FundWithdraw,
  FundWithdrawInfoResponse
} from "components/fund-withdraw/fund-withdraw.types";
import { FUND_CURRENCY } from "shared/constants/constants";
import investmentsApi from "shared/services/api-client/investments-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getFundWithdrawInfo = ({ id }: { id: string }) => (): Promise<
  FundWithdrawInfoResponse
> => {
  const auth = authService.getAuthArg();
  return Promise.all([
    investmentsApi.getFundWithdrawInfo(id, auth, {
      currency: FUND_CURRENCY
    }),
    walletApi.getWalletAvailable(FUND_CURRENCY, auth)
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
}): any => investmentsApi.withdrawFromFund(id, authService.getAuthArg(), value);
