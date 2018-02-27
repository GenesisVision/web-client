import { DASHBOARD_LAYOUT_DEPOSIT } from "../actions/dashboard-actions.constants";

const initialState = {
  isDepositOpen: false,
  isWithdrawOpen: false
};

const dashboardLayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_LAYOUT_DEPOSIT:
      return {
        ...state,
        isDepositOpen: action.isOpen
      };
    default:
      return state;
  }
};

export default dashboardLayoutReducer;
