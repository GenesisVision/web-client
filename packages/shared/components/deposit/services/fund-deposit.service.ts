import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import investmentsApi from "../../../services/api-client/investments-api";
import { ReduxDispatch } from "../../../utils/types";
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
  currency
}: TAssetInvestCreatorArgs) => (dispatch: ReduxDispatch) => {
  return investmentsApi
    .investIntoFund(id, authService.getAuthArg(), {
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
