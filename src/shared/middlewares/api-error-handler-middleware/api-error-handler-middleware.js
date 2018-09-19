import handleErrorMessage from "../../../utils/handle-error-message";

const REJECTED_SUFFIX = "FAILURE";

const apiErrorHandlerMiddleware = (
  config = { failureSuffix: REJECTED_SUFFIX }
) => ({ dispatch }) => next => action => {
  const REJECTED = config.failureSuffix;
  var isRejected = new RegExp(REJECTED + "$", "g");

  if (isRejected && action.error) {
    action.payload = handleErrorMessage(action.payload.response);
  }

  return next(action);
};

export default apiErrorHandlerMiddleware;
