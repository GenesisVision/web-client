import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import { TAssetInvestCreator, TGetAssetInfoCreator } from "../components/deposit.types";

export const getProgramInfoCreator: TGetAssetInfoCreator = getProgramInfoFn => (
  id,
  currency
) => getProgramInfoFn(id, currency, authService.getAuthArg());

export const programInvestCreator: TAssetInvestCreator = programInvestFn => ({
  id,
  amount,
  currency
}) => dispatch => {
  return programInvestFn(id, amount, authService.getAuthArg(), {
    currency
  }).then(() => {
    dispatch(
      alertMessageActions.success(
        "deposit-asset.program.success-alert-message",
        true
      )
    );
    dispatch(fetchWallets(currency));
    dispatch(fetchProfileHeaderInfoAction());
  });
};
