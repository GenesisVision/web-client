import authService from "../../../services/auth-service";
import { updateWalletBalance } from "../../wallet/actions/wallet.actions";
import { fetchProfileHeaderInfo } from "../actions/header-actions";

export const getHeaderInfo = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  dispatch(fetchProfileHeaderInfo(currency, authorization)).then(data =>
    dispatch(
      updateWalletBalance({
        availableGVT: data.value.availableGvt,
        investedGVT: data.value.investedGvt,
        totalBalanceGVT: data.value.totalBalanceGvt
      })
    )
  );
};
