import { composeClearDataActionType } from "shared/actions/clear-data.factory";
import { EMAIL_PENDING } from "shared/actions/email-pending-actions";
import { ActionType } from "shared/utils/types";

export interface IEmailPendingStore {
  readonly email: string;
}

const initialState: IEmailPendingStore = {
  email: ""
} as IEmailPendingStore;

const clearDataActionType: string = composeClearDataActionType(EMAIL_PENDING);

const emailPendingReducer = (
  state: IEmailPendingStore = initialState,
  action: ActionType
): IEmailPendingStore => {
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
