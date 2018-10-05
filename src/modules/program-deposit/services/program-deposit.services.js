import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import {
  fetchDepositProgramInfoById,
  investToProgramById
} from "modules/program-deposit/actions/program-deposit.actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export const getDepositProgramInfoById = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(fetchDepositProgramInfoById(id, accountSettings.currency));
};

export const investServiceInvestById = ({ id, amount }) => dispatch => {
  return dispatch(investToProgramById(id, amount)).then(() => {
    dispatch(
      alertMessageActions.success("deposit-program.success-alert-message", true)
    );
    dispatch(fetchProfileHeaderInfo());
  });
};
