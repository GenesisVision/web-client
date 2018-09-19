import { fetchWithdrawInfoById } from "modules/program-withdraw/actions/program-withdraw.actions";

export const getProgramWithdrawInfo = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(fetchWithdrawInfoById(id, accountSettings.currency));
};
