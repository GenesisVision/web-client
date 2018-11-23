import authService from "../../../services/auth-service";
import { updateWalletBalance } from "../../wallet/actions/wallet.actions";
import { getProfileHeaderInfo } from "../actions/header-actions";

export const fetchProfileHeaderInfo = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(getProfileHeaderInfo(currency, authorization)).then(data =>
    dispatch(
      updateWalletBalance({
        availableGVT: data.value.availableGvt,
        investedGVT: data.value.investedGvt,
        totalBalanceGVT: data.value.totalBalanceGvt
      })
    )
  );
};
