import { fetchProfileHeaderInfo } from "modules/profile-header/actions/profile-header-actions";
import {
  fetchDepositProgramInfoById,
  investToProgramById
} from "modules/program-deposit/actions/program-deposit.actions";

export const getDepositProgramInfoById = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(
    fetchDepositProgramInfoById(id, accountSettings.currentCurrency)
  );
};

export const investServiceInvestById = (id, amount) => dispatch => {
  return dispatch(investToProgramById(id, amount)).then(() =>
    dispatch(fetchProfileHeaderInfo())
  );
};
