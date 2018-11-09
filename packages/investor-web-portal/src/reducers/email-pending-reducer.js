import { composeClearDataActionType } from "shared/actions/clear-data.factory";

import { EMAIL_PENDING } from "../actions/email-pending-actions";

const initialState = {
  email: ""
};

const clearDataActionType = composeClearDataActionType(EMAIL_PENDING);

const emailPendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_PENDING:
      return {
        email: action.payload.email
      };
    case clearDataActionType:
      return initialState;
    default:
      return state;
  }
};

export default emailPendingReducer;
