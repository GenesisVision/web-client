import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import handleErrorResponse, {
  SERVER_CONNECTION_ERROR_CODE
} from "utils/handle-error-response";

const REJECTED_SUFFIX = "FAILURE";

const apiErrorHandlerMiddleware = (
  config = { failureSuffix: REJECTED_SUFFIX }
) => ({ dispatch }) => next => action => {
  const REJECTED = config.failureSuffix;
  var isRejected = new RegExp(REJECTED + "$", "g");

  if (isRejected && action.error) {
    const handledError = handleErrorResponse(action.payload.response);
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
