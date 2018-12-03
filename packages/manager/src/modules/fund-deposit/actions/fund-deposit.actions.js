import {
  FETCH_DEPOSIT_FUND_INFO,
  FETCH_DEPOSIT_FUND_INFO_CLEAR,
  INVEST_TO_FUND_BY_ID,
  INVEST_TO_FUND_BY_ID_CLEAR
} from "modules/fund-deposit/fund-deposit.constants";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const fetchDepositFundInfoById = (id, currency) => {
  return {
    type: FETCH_DEPOSIT_FUND_INFO,
    payload: managerApi.v10ManagerFundsByIdInvestInfoByCurrencyGet(
      id,
      currency,
      authService.getAuthArg()
    )
  };
};

export const clearDepositFundInfo = () => {
  return {
    type: FETCH_DEPOSIT_FUND_INFO_CLEAR
  };
};

export const investToFundById = (id, amount) => {
  return {
    type: INVEST_TO_FUND_BY_ID,
    payload: managerApi.v10ManagerFundsByIdInvestByAmountPost(
      id,
      amount,
      authService.getAuthArg()
    )
  };
};

export const clearInvestSubmitFund = () => {
  return {
    type: INVEST_TO_FUND_BY_ID_CLEAR
  };
};
