import history from "../../../utils/history";

import * as actionTypes from "./trader-deposit-actions.constants";

const fetchTraderDeposit = traderId => {
  return {
    type: actionTypes.TRADER_DEPOSIT,
    payload: Promise.resolve({
      id: "1",
      name: "Program A",
      rate: 22,
      available: 100
    })
  };
};

const submitTraderDeposit = (traderId, amount, onCatch) => {
  return {
    type: actionTypes.TRADER_DEPOSIT_SUBMIT,
    payload: Promise.resolve()
  };
};

const closeTraderDepositModal = from => {
  history.push(from);
};

const traderDepositActions = {
  fetchTraderDeposit,
  closeTraderDepositModal,
  submitTraderDeposit
};
export default traderDepositActions;
