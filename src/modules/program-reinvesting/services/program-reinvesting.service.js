import authService from "services/auth-service";

import {
  disableReinvesting,
  enableReinvesting
} from "../actions/program-reinvesting.actions";

export const toggleReinvesting = (programId, isReinvesting) => dispatch => {
  if (!authService.getAuthArg()) return;

  const requestData = {
    programId,
    authorization: authService.getAuthArg()
  };

  dispatch(
    isReinvesting
      ? disableReinvesting(requestData)
      : enableReinvesting(requestData)
  );
};
