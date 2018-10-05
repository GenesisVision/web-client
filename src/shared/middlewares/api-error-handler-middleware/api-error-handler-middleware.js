import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import handleErrorMessage from "../../../utils/handle-error-message";

const REJECTED_SUFFIX = "FAILURE";

const apiErrorHandlerMiddleware = (
  config = { failureSuffix: REJECTED_SUFFIX }
) => ({ dispatch }) => next => action => {
  const REJECTED = config.failureSuffix;
  var isRejected = new RegExp(REJECTED + "$", "g");

  if (isRejected && action.error) {
    const handledError = handleErrorMessage(action.payload.response);
    const { withLocalizationAlert, error } = alertMessageActions;

    if (handledError.isServerConnectionError) {
      dispatch(withLocalizationAlert(error("alerts.server-error")));
      action.payload = { code: handledError.code };
    }

    if (!handledError.isServerConnectionError) {
      action.payload = handledError;
    }
  }

  return next(action);
};

export default apiErrorHandlerMiddleware;
