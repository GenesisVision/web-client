import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";

import {
  TAssetDeposit,
  TAssetInvestCreatorArgs
} from "../components/deposit.types";

export const fundInvest: TAssetDeposit = ({
  id,
  amount,
  walletId
}: TAssetInvestCreatorArgs) =>
  investmentsApi.investIntoFund(id, authService.getAuthArg(), {
    walletId,
    amount
  });
