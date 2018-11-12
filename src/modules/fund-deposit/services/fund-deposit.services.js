import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  fetchDepositFundInfoById,
  investToFundById
} from "../actions/fund-deposit.actions";

export const getDepositFundInfoById = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(fetchDepositFundInfoById(id, accountSettings.currency));
};

export const investServiceInvestById = ({ id, amount }) => dispatch => {
  return dispatch(investToFundById(id, amount)).then(() => {
    dispatch(
      alertMessageActions.success("deposit-fund.success-alert-message", true)
    );
    dispatch(fetchProfileHeaderInfo());
  });
};
