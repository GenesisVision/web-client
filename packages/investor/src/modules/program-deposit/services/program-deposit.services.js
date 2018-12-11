import {
  fetchDepositFundInfoById,
  fetchDepositProgramInfoById,
  investToProgramById
} from "modules/program-deposit/actions/program-deposit.actions";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export const getDepositProgramInfoById = (id, currency) => dispatch => {
  return dispatch(fetchDepositProgramInfoById(id, currency));
};

export const getDepositFundInfoById = (id, currency) => dispatch => {
  return dispatch(fetchDepositFundInfoById(id, currency));
};

export const investServiceInvestById = ({ id, amount }) => dispatch => {
  return dispatch(investToProgramById(id, amount)).then(() => {
    dispatch(
      alertMessageActions.success(
        "deposit-asset.program.success-alert-message",
        true
      )
    );
    dispatch(fetchProfileHeaderInfo());
  });
};
