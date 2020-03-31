import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { SERVER_CONNECTION_ERROR_CODE } from "utils/handle-error-response";

const REJECTED_SUFFIX = "FAILURE";

const apiErrorHandlerMiddleware = (
  config = { failureSuffix: REJECTED_SUFFIX }
) => ({ dispatch }) => next => action => {
  if (action.error) {
    const REJECTED = config.failureSuffix;
    const isRejected = new RegExp(REJECTED + "$", "g");
    if (isRejected) {
      const handledError = action.payload;
      if (handledError.code === SERVER_CONNECTION_ERROR_CODE) {
        dispatch(
          alertMessageActions.error(
            action.payload.errorMessage || "alerts.server-error",
            true
          )
        );
      } else {
        next({ ...action, payload: handledError });
      }
    }
  }

  return next(action);
};

export default apiErrorHandlerMiddleware;
