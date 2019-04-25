import { ACCOUNT_LAST_UPDATE } from "../actions/wallet.actions";

export type AccountLastUpdateState = {
  timestamp: Date;
};

const initialState: AccountLastUpdateState = {
  timestamp: new Date()
};

const AccountLastUpdateReducer = (
  state: AccountLastUpdateState = initialState,
  action: any
): AccountLastUpdateState => {
  switch (action.type) {
    case ACCOUNT_LAST_UPDATE:
      return { timestamp: action.payload };
    default:
      return state;
  }
};

export default AccountLastUpdateReducer;
