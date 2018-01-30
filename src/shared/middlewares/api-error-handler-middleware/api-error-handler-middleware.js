import { alertMessageActions } from "../../modules/alert-message/actions/alert-message-actions";

const REJECTED_SUFFIX = "FAILURE";

const apiErrorHandlerMiddleware = (
  config = { failureSuffix: REJECTED_SUFFIX }
) => ({ dispatch }) => next => action => {
  const REJECTED = config.failureSuffix;
  var isRejected = new RegExp(REJECTED + "$", "g");

  if (isRejected && action.error) {
    if (
      action.payload.response !== undefined &&
      action.payload.response.body !== null
    ) {
      action.payload = action.payload.response.body.errors;
    } else {
      const error = "Server Error. Please contact administrator.";
      const defaultError = [{ error, code: null }];

      dispatch(alertMessageActions.error(error));
      action.payload = defaultError;
    }
  }

  return next(action);
};

export default apiErrorHandlerMiddleware;
