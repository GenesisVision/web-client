import {
  FETCH_DEPOSIT_PROGRAM_INFO,
  FETCH_DEPOSIT_PROGRAM_INFO_CLEAR,
  INVEST_TO_PROGRAM_BY_ID,
  INVEST_TO_PROGRAM_BY_ID_CLEAR
} from "modules/program-deposit/program-deposit.constants";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const fetchDepositProgramInfoById = (id, currency) => {
  return {
    type: FETCH_DEPOSIT_PROGRAM_INFO,
    payload: investorApi.v10InvestorProgramsByIdInvestInfoByCurrencyGet(
      id,
      currency,
      authService.getAuthArg()
    )
  };
};

export const clearDepositProgramInfo = () => {
  return {
    type: FETCH_DEPOSIT_PROGRAM_INFO_CLEAR
  };
};

export const investToProgramById = (id, amount) => {
  return {
    type: INVEST_TO_PROGRAM_BY_ID,
    payload: investorApi.v10InvestorProgramsByIdInvestByAmountPost(
      id,
      amount,
      authService.getAuthArg()
    ),
    meta: {
      gtm: {
        type: "PROGRAM_INVEST",
        id,
        amount
      }
    }
  };
};

export const clearInvestSubmit = () => {
  return {
    type: INVEST_TO_PROGRAM_BY_ID_CLEAR
  };
};
