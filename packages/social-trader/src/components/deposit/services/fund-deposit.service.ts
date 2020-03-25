import { api, Token } from "services/api-client/swagger-custom-client";

import {
  TAssetDeposit,
  TAssetInvestCreatorArgs
} from "../components/deposit.types";

export const fundInvest: TAssetDeposit = ({
  id,
  amount,
  walletId
}: TAssetInvestCreatorArgs) =>
  api.investments(Token.create()).investIntoFund(id, {
    walletId,
    amount
  });
