import { FundInvestInfo } from "gv-api-web";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

export const getFundInfoCreator = (
  getFundInfoFn: (
    id: string,
    currency: string,
    authorization: string
  ) => Promise<FundInvestInfo>
) => (id: string, currency: string): Promise<FundInvestInfo> => {
  return getFundInfoFn(id, currency, authService.getAuthArg());
};

export const fundInvestCreator = (
  fundInvestFn: (
    id: string,
    amount: number,
    authorization: string,
    opts: {
      currency: string;
    }
  ) => Promise<void>
) => (
  id: string,
  amount: number,
  currency: string
): RootThunk<Promise<void>> => dispatch => {
  return fundInvestFn(id, amount, authService.getAuthArg(), { currency }).then(
    () => {
      dispatch(
        alertMessageActions.success(
          "deposit-asset.fund.success-alert-message",
          true
        )
      );
      dispatch(fetchWallets());
      dispatch(fetchProfileHeaderInfoAction());
    }
  );
};
