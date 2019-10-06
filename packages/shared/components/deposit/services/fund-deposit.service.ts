import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import { TAssetInvestCreator, TGetAssetInfoCreator } from "../components/deposit.types";

export const getFundInfoCreator: TGetAssetInfoCreator = getFundInfoFn => (
  id,
  currency
) => getFundInfoFn(id, currency, authService.getAuthArg());

export const fundInvestCreator: TAssetInvestCreator = fundInvestFn => ({
  id,
  amount,
  currency
}) => dispatch => {
  return fundInvestFn(id, amount, authService.getAuthArg(), { currency }).then(
    () => {
      dispatch(
        alertMessageActions.success(
          "deposit-asset.fund.success-alert-message",
          true
        )
      );
      dispatch(fetchWallets(currency));
      dispatch(fetchProfileHeaderInfoAction());
    }
  );
};
