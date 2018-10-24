import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import {
  fetchDepositFundInfoById,
  investToFundById
} from "../actions/fund-deposit.actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export const getDepositFundInfoById = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(fetchDepositFundInfoById(id, accountSettings.currency));
};

export const investServiceInvestById = ({ id, amount }) => dispatch => {
  return dispatch(investToFundById(id, amount)).then(() => {
    dispatch(
      alertMessageActions.success("deposit-program.success-alert-message", true)
    );
    dispatch(fetchProfileHeaderInfo());
  });
};
