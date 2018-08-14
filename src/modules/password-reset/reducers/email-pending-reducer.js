import { composeClearDataActionType } from "shared/actions/clear-data.factory";
import { EMAIL_RESET_PASSWORD } from "../actions/password-reset-actions.constants";

export const initialState = {
  email: ""
};

const clearDataActionType = composeClearDataActionType(EMAIL_RESET_PASSWORD);

const emailPendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_RESET_PASSWORD: {
      return {
        email: action.payload.email
      };
    }
    case clearDataActionType:
      return initialState;
    default:
      return state;
  }
};

export default emailPendingReducer;
