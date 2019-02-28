import {
  FETCH_DEPOSIT_FUND_INFO,
  FETCH_DEPOSIT_FUND_INFO_CLEAR,
  INVEST_TO_FUND_BY_ID,
  INVEST_TO_FUND_BY_ID_CLEAR
} from "modules/fund-deposit/fund-deposit.constants";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const fetchDepositFundInfoById = (id, currency) => {
  return {
    type: FETCH_DEPOSIT_FUND_INFO,
    payload: investorApi.v10InvestorFundsByIdInvestInfoByCurrencyGet(
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

export const investToFundById = (id, amount, opts) => {
  return {
    type: INVEST_TO_FUND_BY_ID,
    payload: investorApi.v10InvestorFundsByIdInvestByAmountPost(
      id,
      amount,
      authService.getAuthArg(),
      opts
    )
  };
};

export const clearInvestSubmitFund = () => {
  return {
    type: INVEST_TO_FUND_BY_ID_CLEAR
  };
};
