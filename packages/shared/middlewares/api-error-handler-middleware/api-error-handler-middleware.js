import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { SERVER_CONNECTION_ERROR_CODE } from "shared/utils/handle-error-response";

const REJECTED_SUFFIX = "FAILURE";

const apiErrorHandlerMiddleware = (
  config = { failureSuffix: REJECTED_SUFFIX }
) => ({ dispatch }) => next => action => {
  const REJECTED = config.failureSuffix;
  const isRejected = new RegExp(REJECTED + "$", "g");

  if (isRejected && action.error) {
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

  return next(action);
};

export default apiErrorHandlerMiddleware;
