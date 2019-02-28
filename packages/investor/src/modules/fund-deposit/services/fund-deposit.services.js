import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  fetchDepositFundInfoById,
  investToFundById
} from "../actions/fund-deposit.actions";

export const getDepositFundInfoById = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(fetchDepositFundInfoById(id, accountSettings.currency));
};

export const investServiceInvestById = ({ id, amount, opts }) => dispatch => {
  return dispatch(investToFundById(id, amount, opts)).then(() => {
    dispatch(
      alertMessageActions.success(
        "deposit-asset.fund.success-alert-message",
        true
      )
    );
    dispatch(fetchProfileHeaderInfo());
  });
};
