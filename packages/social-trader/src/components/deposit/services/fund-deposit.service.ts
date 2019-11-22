import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { fetchWallets } from "components/wallet/services/wallet.services";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";
import { ReduxDispatch } from "utils/types";

import {
  TAssetDeposit,
  TAssetInvestCreatorArgs,
  TGetAssetInfoCreator
} from "../components/deposit.types";

export const getFundInfoCreator: TGetAssetInfoCreator = getFundInfoFn => (
  id,
  currency
) => getFundInfoFn(id, currency, authService.getAuthArg());

export const fundInvest: TAssetDeposit = ({
  id,
  amount,
  currency,
  walletId
}: TAssetInvestCreatorArgs) => (dispatch: ReduxDispatch) => {
  return investmentsApi
    .investIntoFund(id, authService.getAuthArg(), {
      walletId,
      amount
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "deposit-asset.program.success-alert-message",
          true
        )
      );
      // @ts-ignore
      dispatch(fetchWallets(currency));
      dispatch(fetchProfileHeaderInfoAction());
    });
};
